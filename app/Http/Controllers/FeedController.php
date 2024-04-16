<?php

namespace App\Http\Controllers;

use App\Events\FeedCreatedEvent;
use App\Http\Requests\FeedRequest;
use App\Http\Resources\FeedResource;
use App\Models\Feed;

class FeedController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Feed::class, 'feed');
    }

    public function index()
    {
        return inertia()->render('Feed/Index');
    }

    public function list()
    {
        $feeds = Feed::query()
            ->orderByDesc('created_at')
            ->with(['user'])
            ->get();

        return FeedResource::collection($feeds);
    }

    public function store(FeedRequest $request)
    {
        $feed = $request->user()->feeds()->create($request->validated());

        event(new FeedCreatedEvent($feed));

        return back()->with('success', 'Feed created successfully');
    }

    public function destroy(Feed $feed)
    {
        $feed->delete();

        return back()->with('success', 'Feed deleted successfully');
    }
}
