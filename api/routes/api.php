<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserColumnController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix'     => 'auth'
], function () {
    Route::post('login', [
        AuthController::class,
        'login'
    ]);
    Route::post('logout', [
        AuthController::class,
        'logout'
    ]);
    Route::get('refresh', [
        AuthController::class,
        'refresh'
    ]);
    Route::get('me', [
        AuthController::class,
        'me'
    ]);
});

Route::middleware([
    'auth:api',
    RoleMiddleware::class . ':admin'
])->group(function () {
    Route::prefix('person')->group(function () {
        Route::get('/type/{string:type}', [
            PersonController::class,
            'index'
        ]);
        Route::get('{int:id}', [
            PersonController::class,
            'show'
        ]);
        Route::post('{type}', [
            PersonController::class,
            'store'
        ]);
        Route::match([
            'put',
            'patch'
        ], '{type}/{id}', [
            PersonController::class,
            'update'
        ]);
        Route::delete('{id}', [
            PersonController::class,
            'destroy'
        ]);
    });

    Route::apiResource('userColumns', UserColumnController::class, []);

    Route::apiResource('admin', AdminController::class);

    Route::apiResource('system', SystemController::class, []);
    Route::group(['prefix' => 'system'], function () {
        Route::get('{system}/users/count', [
            SystemController::class,
            'showUsersCount'
        ]);
    });

    Route::apiResource('theme', ThemeController::class, []);

    Route::get('cnpjInfo/{string:cnpj}', function (string $cnpj) {
        $cnpj = Http::get("https://receitaws.com.br/v1/cnpj/$cnpj")->json();

        if (isset($cnpj['status']) && $cnpj['status'] === 'ERROR') {
            return response()->json(['error' => 'CNPJ not found'], 404);
        }

        return response()->json($cnpj, 200);
    });

    Route::get('cepInfo/{string:cep}', function (string $cep) {
        $cep = Http::get("https://viacep.com.br/ws/$cep/json/")->json();

        if (isset($cep['erro'])) {
            return response()->json(['error' => 'CEP not found'], 404);
        }

        return response()->json($cep, 200);
    });
});

Route::middleware([
    'auth:api',
    RoleMiddleware::class . ':contador,admin'
])->group(function () {
    Route::group(['prefix' => 'file'], function () {
        Route::get('available-years', [
            FileController::class,
            'availableYears'
        ]);

        Route::get('download/{filename}', [
            FileController::class,
            'downloadPrivateFile'
        ])->where('filename', '.*');

        Route::post('download-multiple', [
            FileController::class,
            'downloadMultipleFiles'
        ]);

        Route::get('archive/{userId}/{year}/{month}', [
            FileController::class,
            'archives'
        ])->where('userId', '[0-9]+');

        Route::get('sped/{userId}/{year}/{month}', [
            FileController::class,
            'speds'
        ])->where('userId', '[0-9]+');

        Route::get('certificate/{userId}', [
            FileController::class,
            'certificates'
        ])->where('userId', '[0-9]+');
    });

    Route::get('client/{userId}', [
        PersonController::class,
        'getClients'
    ])->where('userId', '[0-9]+');
});

Route::get('file/download-public/{filename}', [
    FileController::class,
    'downloadPublicFile'
])->where('filename', '.*');