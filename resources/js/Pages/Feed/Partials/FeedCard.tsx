import React from 'react';
import { Feed, PageProps } from "@/types";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Dropdown from "@/Components/Dropdown";
import { useForm, usePage } from "@inertiajs/react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

dayjs.extend(relativeTime);

interface Props {
  feed: Feed;
  onDeleted: () => void;
}

export default function FeedCard({feed, onDeleted}: Readonly<Props>) {
  const {auth} = usePage<PageProps>().props

  const {delete: deleteFeed, processing} = useForm();

  const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this feed?')) {
      deleteFeed(route('feeds.destroy', feed.id), {
        preserveScroll: true,
        onSuccess: () => onDeleted(),
      });
    }
  }

  return (
    <div className="p-6 flex space-x-2">
      <ChatBubbleBottomCenterTextIcon className="h-6 w-6"/>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-800">{feed.user.name}</span>
            <small className="ml-2 text-sm text-gray-600">{dayjs(feed.created_at).fromNow()}</small>
          </div>
          {feed.user.id === auth.user.id &&
              <Dropdown>
                  <Dropdown.Trigger>
                      <EllipsisHorizontalIcon className="h-6 w-6 text-gray-400"/>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                      <Dropdown.Link as="button" href={route('feeds.destroy', feed.id)} onClick={handleDelete}
                                     disabled={processing}>
                          Delete
                      </Dropdown.Link>
                  </Dropdown.Content>
              </Dropdown>
          }
        </div>
        <p className="mt-4 text-lg text-gray-900">{feed.content}</p>
      </div>
    </div>
  );
}
