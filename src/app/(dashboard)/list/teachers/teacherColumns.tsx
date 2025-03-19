'use client'

import { cn } from '@/lib/utils'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Teacher } from '@/types/teacher-types'
import NumberFormat from '@/components/shared/number-format'

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return (
        <div className='flex justify-start pl-4 font-semibold text-orange-400'>
          Name
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='flex items-center p-1'>
        <Image
          src={row.original.photo}
          alt=''
          width={40}
          height={40}
          className='mr-4 h-10 w-10 rounded-full object-cover md:hidden xl:block'
        />
        <div>{row.original.name}</div>
      </div>
    ),
    footer: 'Total'
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div className='hidden justify-start font-semibold text-orange-400 lg:table-cell'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className={cn('rounded-lg p-2 text-start capitalize')}>
        {row.original.email}
      </div>
    )
  },
  {
    accessorKey: 'teacherId',
    header: () => {
      return (
        <div className='hidden justify-start font-semibold text-orange-400 md:table-cell'>
          Teacher ID
        </div>
      )
    }
  },
  {
    accessorKey: 'classes',
    header: () => {
      return (
        <div className='hidden justify-start font-semibold text-orange-400 md:table-cell'>
          Classes
        </div>
      )
    }
  },
  {
    accessorKey: 'subjects',
    header: () => {
      return (
        <div className='hidden justify-start font-semibold text-orange-400 md:table-cell'>
          Subjects
        </div>
      )
    }
  },
  {
    accessorKey: 'phone',
    header: () => {
      return (
        <div className='flex justify-end pr-4 font-semibold text-orange-400'>
          Phone
        </div>
      )
    },
    cell: ({ row }) => (
      <div className={cn('rounded-lg bg-green-100 p-2 text-right capitalize')}>
        {row.original.phone}
      </div>
    ),

    footer: props => {
      const totalBalance = props.table.getRowModel()

      return <div className='pr-2 text-right font-semibold'></div>
    }
  },
  {
    accessorKey: 'actions',
    header: () => {
      return (
        <div className='flex justify-start font-semibold text-orange-400'>
          Actions
        </div>
      )
    },
    cell: ({ row }) => {
      // IMPORTANT THIS IS THE TEACHER DATA FROM WHICH YOU CAN GET THE ID
      const teacher = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex justify-center'>
              <Button size='icon' variant='ghost'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/list/teachers/${teacher.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`list/teachers/${teacher.id}/deleteTeacher`}>
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
