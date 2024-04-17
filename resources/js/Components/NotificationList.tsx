import React, { useEffect, useMemo } from 'react';
import Dropdown from "@/Components/Dropdown";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Notification } from "@/types";
import axios from "axios";

function NotificationList() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  const fetchNotifications = useMemo(() => async () => {
    const response = await axios.get(route('notifications.index'));
    setNotifications(response.data.data);
    setUnreadCount(response.data.meta.unread_count);
  }, []);

  useEffect(() => {
    fetchNotifications().catch(error => console.error(error));
  }, []);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true"/>
              {unreadCount > 0 && <span className="h-2 w-2 bg-yellow-500 rounded-full absolute top-1.5 right-0"></span>}
            </button>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content width={'w-96'}>
        <div className="py-1 bg-white dark:bg-gray-700">
          {notifications.map(notification => (
            <Link
              key={notification.id}
              href={route('notifications.show', notification.id)}
              className={`block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ${notification.read ? '' : 'bg-gray-200 dark:bg-gray-900'}`}
            >
              <div className="flex items-center">
                <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" aria-hidden="true"/>
                <div>
                  <p className="font-semibold">{notification.title}</p>
                  <p>{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default NotificationList;
