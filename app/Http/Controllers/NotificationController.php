<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()->paginate(10);

        return NotificationResource::collection($notifications)->additional([
            'meta' => [
                'unread_count' => $user->unreadNotifications->count(),
            ],
        ]);
    }

    public function show(DatabaseNotification $notification)
    {
        $notification->markAsRead();

        return redirect()->route('feeds.index');
    }
}
