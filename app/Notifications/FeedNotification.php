<?php

namespace App\Notifications;

use App\Models\Feed;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FeedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Feed $feed
    ) {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $channels = [];
        $channels[] = 'database';
        if ($notifiable->email_verified_at) {
            $channels[] = 'mail';
        }

        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $feed = $this->feed;
        $user = $feed->user;

        return (new MailMessage)
            ->subject('New Post Published')
            ->line("{$user->name} has published a new post.")
            ->action('View Post', route('feeds.index'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'New Post Published',
            'message' => "{$this->feed->user->name} has published a new post.",
        ];
    }
}
