import React, { useEffect, useState } from 'react';
import { Feed, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "@/Pages/Feed/Partials/Form";
import axios from "axios";
import FeedCard from "@/Pages/Feed/Partials/FeedCard";

function Index({auth}: PageProps) {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const fetchFeeds = async () => {
    try {
      const response = await axios.get(route('feeds.list'));
      setFeeds(response.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFeeds().catch(error => console.error(error));
  }, []);

  useEffect(() => {
    window.Echo.channel('feeds')
      .listen('.feed.created', (event: any) => {
        setFeeds(prevFeeds => {
          // Check if the new feed already exists in the state
          const feedExists = prevFeeds.some(feed => feed.id === event.feed.id);

          // If the feed doesn't exist, add it to the state
          if (!feedExists) {
            return [event.feed, ...prevFeeds];
          }

          // If the feed already exists, return the previous state
          return prevFeeds;
        });
      })
      .listen('.feed.deleted', (event: any) => {
        setFeeds(prevFeeds => prevFeeds.filter(feed => feed.id !== event.feed_id));
      });
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Feeds</h2>}
    >
      <Head title="Feeds"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <Form onPostSubmit={fetchFeeds}/>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <section>
              <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {feeds.length > 0 ? feeds.map(feed => (
                  <FeedCard key={feed.id} feed={feed} onDeleted={fetchFeeds}/>
                )) : (
                  <div className="p-6 text-center text-gray-800 dark:text-gray-600">
                    No feeds found
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
