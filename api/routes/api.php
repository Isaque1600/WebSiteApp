<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserColumnController;
use App\Http\Middleware\JWTCheckToken;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::middleware(['auth:api', RoleMiddleware::class . ':admin'])->group(function () {
    Route::prefix('person')->group(function () {
        Route::get('{type}', [PersonController::class, 'index']);
        Route::post('{type}', [PersonController::class, 'store']);
        Route::match(['put', 'patch'], '{type}/{id}', [PersonController::class, 'update']);
        Route::delete('{type}/{id}', [PersonController::class, 'destroy']);
    });

    Route::apiResource('userColumns', UserColumnController::class, []);

    Route::apiResource('admin', AdminController::class);

    Route::apiResource('systems', SystemController::class, []);

    Route::apiResource('theme', ThemeController::class, []);

    Route::get('cnpjInfo/{string:cnpj}', function (string $cnpj) {
        $cnpj = Http::get("https://receitaws.com.br/v1/cnpj/$cnpj")->json();

        return response()->json($cnpj, 200);
    });

    Route::get('cepInfo/{string:cep}', function (string $cep) {
        $cep = Http::get("https://viacep.com.br/ws/$cep/json/")->json();

        return response()->json($cep, 200);
    });
});


Route::get('file/download/{string:filename}', [FileController::class, 'downloadPublicFile']);