<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuctionController;

Route::get('/', function () {
    return view('game'); 
});

Route::post('/place-bid', [AuctionController::class, 'placeBid']);

