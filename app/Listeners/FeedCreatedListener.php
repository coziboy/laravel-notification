<?php

namespace App\Listeners;

use App\Events\FeedCreatedEvent;
use App\Models\User;
use App\Notifications\FeedNotification;
use Illuminate\Support\Facades\Notification;

class FeedCreatedListener
{
    public function handle(FeedCreatedEvent $event): void
    {
        $feed = $event->feed;

        $users = User::query()
            ->whereNot('id', $feed->user_id)
            ->get();

        Notification::send($users, new FeedNotification($feed));
    }
}
