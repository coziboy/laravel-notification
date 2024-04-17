<?php

use App\Http\Controllers\FeedController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::prefix('profile')
        ->as('profile.')
        ->controller(ProfileController::class)
        ->group(function () {
            Route::get('/', 'edit')->name('edit');
            Route::patch('/', 'update')->name('update');
            Route::delete('/', 'destroy')->name('destroy');
        });

    Route::prefix('feeds')
        ->as('feeds.')
        ->controller(FeedController::class)
        ->group(function () {
            Route::get('/list', 'list')->name('list');
        });
    Route::resource('feeds', FeedController::class)->only(['index', 'store', 'destroy']);
    Route::resource('notifications', NotificationController::class)->only(['index', 'show']);
});

require __DIR__.'/auth.php';
