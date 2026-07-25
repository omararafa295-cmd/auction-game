<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BidPlaced implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public $data;
    public $roomCode;

    public function __construct($data, $roomCode)
    {
        $this->data = $data;
        $this->roomCode = $roomCode;
    }

    public function broadcastOn(): array
    {
        // البث هيكون على قناة مخصصة لكود الغرفة فقط
        return [
            new Channel('auction-room.' . $this->roomCode),
        ];
    }
}