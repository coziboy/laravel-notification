<?php

namespace App\Events;

use App\Models\Feed;
use Illuminate\Foundation\Events\Dispatchable;

class FeedCreatedEvent
{
    use Dispatchable;

    public function __construct(
        public Feed $feed
    ) {
    }
}
