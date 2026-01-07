<?php

namespace App\Http\Controllers;

class FileController extends Controller
{
    public function downloadPublicFile(string $filePath)
    {
        $filePath = base_path("archives/{$filePath}");

        if (empty($filePath) || !preg_match('/^[a-zA-Z0-9_\-\/\ ]+$/', $filePath) || in_array($filePath, ['.gitignore'])) {
            return response()->json(['error' => 'Invalid file path'], 400);
        }

        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->download($filePath);
    }
}
