<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserColumnController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

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
