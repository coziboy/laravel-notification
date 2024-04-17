<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FeedDeletedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        private readonly int $feed_id
    ) {
    }

    public function broadcastOn(): Channel
    {
        return new Channel('feeds');
    }

    public function broadcastAs(): string
    {
        return 'feed.deleted';
    }

    public function broadcastWith(): array
    {
        return [
            'feed_id' => $this->feed_id,
        ];
    }
}
