<?php

namespace App\Events;

use App\Http\Resources\FeedResource;
use App\Models\Feed;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class FeedCreatedEvent implements ShouldBroadcast
{
    use Dispatchable;

    public function __construct(
        public Feed $feed
    ) {
    }

    public function broadcastOn(): Channel
    {
        return new Channel('feeds');
    }

    public function broadcastAs(): string
    {
        return 'feed.created';
    }

    public function broadcastWith(): array
    {
        $feed = $this->feed->load('user');

        return [
            'feed' => new FeedResource($feed),
        ];
    }
}
