<?php

namespace App\Http\Resources;

use App\Models\Feed;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Feed */
class FeedResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'id' => $this->id,
            'content' => $this->content,

            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
