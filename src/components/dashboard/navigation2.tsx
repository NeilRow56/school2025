'use client'

import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

import { addWeeks, format } from 'date-fns'
import { User2Icon } from 'lucide-react'

function Navigation2() {
  const from = format(new Date(), 'yyyy-MM-dd')
  const to = format(addWeeks(new Date(), 2), 'yyyy-MM-dd')
  return (
    <nav className='hidden w-full sm:block'>
      <div className='container mx-auto flex items-center justify-between border-b p-4'>
        <div className='flex items-center space-x-8'>
          <Link href='/' className='hover:text-gray-400'>
            Cataloge
          </Link>
          <Link href='/locations' className='hover:text-gray-400'>
            Locations
          </Link>
          <Link
            href={`/activities?from=${from}&to=${to}`}
            className='hover:text-gray-400'
          >
            Activities
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='text-primary'>
                  Library resources
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className='flex flex-col p-4 md:w-[400px] lg:w-[500px]'>
                    <li>
                      <Link
                        href='library-card'
                        className='hover:bg-accent block space-y-1 rounded p-3'
                      >
                        <div className='leading-none font-medium'>
                          Library card
                        </div>
                        <p className='text-muted-foreground text-sm'>
                          Use your library card to borrow materials, access
                          digital resources, and explore library technology.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='book-a-room'
                        className='hover:bg-accent block space-y-1 rounded p-3'
                      >
                        <div className='leading-none font-medium'>
                          Book a room
                        </div>
                        <p className='text-muted-foreground text-sm'>
                          Book a room for a meeting or group discussions.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='equipment-rental'
                        className='hover:bg-accent block space-y-1 rounded p-3'
                      >
                        <div className='leading-none font-medium'>
                          Equipment rental
                        </div>
                        <p className='text-muted-foreground text-sm'>
                          Rent 3D printers, projectors and more.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <User2Icon />
      </div>
    </nav>
  )
}

export default Navigation2
