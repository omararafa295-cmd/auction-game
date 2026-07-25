<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\BidPlaced;

class AuctionController extends Controller
{
    public function placeBid(Request $request)
    {
        $roomCode = $request->input('roomCode');
        broadcast(new BidPlaced($request->all(), $roomCode))->toOthers();
        
        return response()->json(['status' => 'success']);
    }
}