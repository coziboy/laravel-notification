<?php

namespace App\Notifications;

use App\Models\Feed;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use JsonException;
use NotificationChannels\Telegram\TelegramMessage;

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
        if ($notifiable->telegram_id) {
            $channels[] = 'telegram';
        }

        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(): MailMessage
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
    public function toArray(): array
    {
        return [
            'title' => 'New Post Published',
            'message' => "{$this->feed->user->name} has published a new post.",
        ];
    }

    /**
     * @throws JsonException
     */
    public function toTelegram($notifiable)
    {
        $url = route('feeds.index');

        return TelegramMessage::create()
            // Optional recipient user id.
            ->to($notifiable->telegram_id)
            // Markdown supported.
            ->content('**New Post Published**'.PHP_EOL.PHP_EOL)
            ->line("{$this->feed->user->name} has published a new post.".PHP_EOL)
            ->line('Thank you for using our application!')
            ->button('View Post', $url);
    }
}
