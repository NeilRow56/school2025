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

// import { Student } from '@/types/Student.types'
import NumberFormat from '@/components/shared/number-format'
import { Student } from '@prisma/client'

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return (
        <div className='flex justify-start font-semibold text-orange-400'>
          Name
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='flex items-center p-1'>
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
    accessorKey: 'studentId',
    header: () => {
      return (
        <div className='ml-3 hidden justify-start font-semibold text-orange-400 md:table-cell'>
          Student ID
        </div>
      )
    },
    cell: ({ row }) => (
      <div className={cn('rounded-lg text-start capitalize')}>
        <div>{row.original.id}</div>
      </div>
    )
  },

  {
    accessorKey: 'phone',
    header: () => {
      return (
        <div className='ml-3 flex justify-start font-semibold text-orange-400'>
          Phone
        </div>
      )
    },
    cell: ({ row }) => (
      <div className={cn('rounded-lg pl-3 text-start capitalize')}>
        {row.original.phone}
      </div>
    )
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <div className='hidden justify-start font-semibold text-orange-400 lg:table-cell'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Address
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className={cn('rounded-lg pl-3 text-start capitalize')}>
        {row.original.address}
      </div>
    )
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
      // IMPORTANT THIS IS THE STUDENT DATA FROM WHICH YOU CAN GET THE ID
      const student = row.original

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
              <Link href={`/list/students/${student.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`list/team/${student.id}/deleteTeamMember`}>
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
