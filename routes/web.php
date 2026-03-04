<?php

use App\Http\Controllers\PublicInteractionController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'site')->name('home');
Route::view('/music', 'site')->name('music');
Route::view('/bookings', 'site')->name('bookings');
Route::view('/media', 'site')->name('media');
Route::view('/about', 'site')->name('about');
Route::view('/contact', 'site')->name('contact');

Route::post('/bookings/request', [PublicInteractionController::class, 'storeBooking'])
    ->name('bookings.request');
Route::post('/newsletter/subscribe', [PublicInteractionController::class, 'subscribeNewsletter'])
    ->name('newsletter.subscribe');

Route::view('/admin-gateway', 'admin-gateway')->name('admin.gateway');
