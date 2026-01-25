<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Log;
use Storage;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

use function in_array;

class FileController extends Controller {
    public function downloadPublicFile(string $filePath) {
        $filePath = trim(urldecode($filePath));

        Log::debug(Storage::disk('public')->exists($filePath) == true ? 'ok' : 'not found');

        if (empty($filePath) || str_contains($filePath, '..') || !preg_match('/^[\p{L}0-9_\-\/\ .]+$/u', $filePath) || in_array(basename($filePath), ['.gitignore'])) {
            return response()->json(['error' => 'Invalid file path'], 400);
        }

        if (!Storage::disk('public')->exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->download(Storage::disk('public')->path($filePath), $filePath);
    }

    public function downloadPrivateFile(string $filePath) {
        $baseName = basename(urldecode($filePath));

        Log::debug("Requested file download: $filePath");

        if (empty($filePath) || str_contains($filePath, '..') || !preg_match('/^[\p{L}0-9_\-\/\ .]+$/u', $filePath) || in_array($baseName, ['.gitignore'])) {
            return response()->json(['error' => 'Invalid file path'], 400);
        }

        if (!Storage::fileExists("/archives/$filePath")) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return Storage::download("/archives/$filePath");
    }

    public function downloadMultipleFiles(Request $request) {
        $filesPaths = $request->validate([
            'files'   => 'required|array',
            'files.*' => 'required|string',
        ]);

        $filesPaths['files'] = array_map(fn ($path) => urldecode($path), $filesPaths['files']);

        $tempDir = storage_path('app/temp');

        if (!is_dir($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $zipFileName = 'files_' . Str::uuid() . ".zip";
        $zipPath     = "$tempDir/$zipFileName";

        $zip = new \ZipArchive();

        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            return response()->json(['error' => 'Could not create zip file'], 500);
        }

        $filesAdded = 0;

        foreach ($filesPaths['files'] as $filePath) {
            if (empty($filePath) || str_contains($filePath, '..') || !preg_match('/^[\p{L}0-9_\-\/\ .]+$/u', $filePath) || in_array(basename($filePath), ['.gitignore'])) {
                continue;
            }

            if (Storage::fileExists("/archives/$filePath")) {
                $zip->addFile(storage_path("app/archives/$filePath"), basename($filePath));
                $filesAdded++;
            }
        }

        if ($filesAdded === 0) {
            $zip->close();
            @unlink($zipPath);
            return response()->json(['error' => 'No valid files found to download'], 404);
        }

        $zip->close();

        if (!file_exists($zipPath)) {
            return response()->json(['error' => 'Failed to create zip file'], 500);
        }

        return response()->download($zipPath)
            ->deleteFileAfterSend(true);
    }

    public function availableYears() {
        $years = Storage::directories('archives');

        return response()->json([
            'status' => 'success',
            'data'   => array_map(function ($yearPath) {
                return basename($yearPath);
            }, $years)
        ]);
    }

    // private function getFileFromArchive(string $archivePath, string $fileInsideArchive): ?string {
    //     $extension = strtolower(pathinfo($archivePath, PATHINFO_EXTENSION));

    //     if ($extension === 'zip') {
    //         $zip = new \ZipArchive();

    //         if ($zip->open($archivePath) !== true) {
    //             return null;
    //         }

    //         if ($zip->locateName($fileInsideArchive) === false) {
    //             $zip->close();
    //             return null;
    //         }

    //         $content = $zip->getFromName($fileInsideArchive);
    //         $zip->close();

    //         return $content !== false ? $content : null;
    //     }

    //     if ($extension === 'rar') {
    //         if (class_exists('RarArchive')) {
    //             $rar = \RarArchive::open($archivePath);

    //             if ($rar !== false) {
    //                 $entry = $rar->getEntry($fileInsideArchive);

    //                 if ($entry !== false) {
    //                     $stream  = $entry->getStream();
    //                     $content = stream_get_contents($stream);
    //                     fclose($stream);
    //                     $rar->close();
    //                     return $content;
    //                 }
    //                 $rar->close();
    //             }
    //         }

    //         $tempFile = tempnam(sys_get_temp_dir(), 'rar_');
    //         $command  = sprintf(
    //             'unrar p -inul %s %s > %s 2>/dev/null',
    //             escapeshellarg($archivePath),
    //             escapeshellarg($fileInsideArchive),
    //             escapeshellarg($tempFile)
    //         );

    //         exec($command, $output, $returnCode);

    //         if ($returnCode !== 0) {
    //             @unlink($tempFile);
    //             return null;
    //         }

    //         $content = file_get_contents($tempFile);
    //         @unlink($tempFile);

    //         return $content;
    //     }

    //     return null;
    // }

    private function files(string $year, string $month, array $clients, string $basePath, string $type) {
        $hiddenFiles = ['.gitignore'];

        $year  = $year ?: date('Y');
        $month = $month ?: date('m');

        if ($year != 'all') {
            $basePath .= "$year/";
        }

        if ($month != 'all') {
            $basePath .= "$month/";
        }

        $files = collect(Storage::files("$basePath/", true))->filter(function ($file) use ($clients, $type, $hiddenFiles) {
            if ($type === 'certificates') {
                if (!empty($clients) && !collect($clients)->contains(fn ($client) => Str::contains(Str::slug(basename($file)), $client))) {
                    return false;
                }

                if (!in_array(Str::lower(basename($file)), $hiddenFiles)) {
                    return false;
                }

                return true;
            }

            if (in_array(Str::lower(basename($file)), $hiddenFiles)) {
                return false;
            }

            if (!Str::contains(Str::lower(basename($file)), $type === 'sped' ? 'sped' : 'arquivos fiscais')) {
                return false;
            }

            if (!empty($clients) && !collect($clients)->contains(fn ($client) => Str::contains(Str::slug(basename($file)), $client))) {
                return false;
            }

            return true;
        })
            ->values()
            ->all();

        return array_map(function ($file) use ($year, $month, $basePath, $type) {
            if ($type === 'certificates') {
                return [
                    'filename'     => basename($file),
                    'size'         => round(Storage::size($file) / 1024, 2),
                    'lastModified' => Carbon::createFromTimestamp(Storage::lastModified($file), 'America/Recife')->toDateTimeString(),
                    'url'          => str_replace('certificates/', '', $file)
                ];
            }

            return [
                'filename'     => basename($file),
                'year'         => $year == 'all' ? explode('/', str_replace('archives/', '', $file))[0] : $year,
                'month'        => $month == 'all' ? explode('/', str_replace($basePath, '', $file))[1] : $month,
                'size'         => round(Storage::size($file) / 1024, 2),
                'lastModified' => Carbon::createFromTimestamp(Storage::lastModified($file), 'America/Recife')->toDateTimeString(),
                'url'          => str_replace('archives/', '', $file)
            ];
        }, $files);
    }

    private function getValidClients(int $userId, string $client) {
        $user = User::findOrFail($userId, ['login']);

        $validClients = Person::where('tipo', 'cliente')
            ->where('contador', $user->login)
            ->where('nome', 'LIKE', "%$client%")
            ->orderBy("nome", "asc")
            ->pluck('nome')
            ->toArray();

        if (!$validClients) {
            throw new BadRequestHttpException('No valid clients found for the user.');
        }

        return array_map(function ($clientName) {
            return Str::slug($clientName, '-', 'pt_BR');
        }, $validClients);
    }

    public function archives(Request $request, int $userId, string $year = 'all', string $month = 'all') {
        try {
            $client = $request->client ?? '';

            $clients = $this->getValidClients($userId, $client);

            $files = $this->files($year, $month, $clients, 'archives/', 'archives');

            if (!$files) {
                throw new BadRequestHttpException('No files found for the given parameters.');
            }

            return response()->json([
                'status' => 'success',
                'data'   => $files
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function speds(Request $request, int $userId, string $year = 'all', string $month = 'all') {
        try {
            $client = $request->client ?? '';

            $clients = $this->getValidClients($userId, $client);

            $files = $this->files($year, $month, $clients, 'archives/', 'sped');

            if (!$files) {
                throw new BadRequestHttpException('No files found for the given parameters.');
            }

            return response()->json([
                'status' => 'success',
                'data'   => $files
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function certificates(Request $request, int $userId) {
        try {
            $verifiedClients = $this->getValidClients($userId, '');

            $files = $this->files('all', 'all', $verifiedClients, 'certificates/', 'certificates');

            if (!$files) {
                throw new BadRequestHttpException('No files found.');
            }

            return response()->json([
                'status' => 'success',
                'data'   => $files
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
