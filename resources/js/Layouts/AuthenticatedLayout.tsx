import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { toast, Toaster } from "react-hot-toast";
import NotificationList from "@/Components/NotificationList";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/16/solid";

export default function Authenticated({user, header, children}: PropsWithChildren<{ user: User, header?: ReactNode }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const {flash} = usePage<PageProps>().props

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
  }, [flash.success]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"/>
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </NavLink>
                <NavLink href={route('feeds.index')} active={route().current('feeds.index')}>
                  Feeds
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <NotificationList/>
              </div>
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                        >
                            {user.name}

                          <ChevronDownIcon className="h-5 w-5 ml-2 -mr-1" aria-hidden="true"/>
                        </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
              >
                <Bars3Icon className={`h-6 w-6 ${showingNavigationDropdown ? 'hidden' : 'inline-flex'}`}
                           aria-hidden="true"/>
                <XMarkIcon className={`h-6 w-6 ${showingNavigationDropdown ? 'inline-flex' : 'hidden'}`}
                           aria-hidden="true"/>
              </button>

              <div className="ms-2">
                <NotificationList/>
              </div>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('feeds.index')} active={route().current('feeds.index')}>
              Feeds
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                {user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>{children}</main>

      <Toaster
        position={'bottom-right'}
      />
    </div>
  );
}
