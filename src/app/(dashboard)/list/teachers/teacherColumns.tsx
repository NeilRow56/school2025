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
import { MoreHorizontal } from 'lucide-react'
import { Class, Subject, Teacher } from '@prisma/client'
import { createRowActions } from '@/components/shared/data-table-actions'
import DataTableColumnHeader from '@/components/shared/data-table-column-header'

// export type Teacher = {
//   id: string
//   username: string
//   name: string

//   email?: string | null
//   phone: string | null
//   address: string
//   img: string | null

// }

export type TeacherList = Teacher & { subjects: Subject[] } & {
  classes: Class[]
}

export const columns: ColumnDef<TeacherList>[] = [
  {
    // accessorKey: 'info',
    // header: () => {
    //   return (
    //     <div className='flex justify-start pl-4 font-semibold text-orange-400'>
    //       Info
    //     </div>
    //   )
    // },
    accessorKey: 'name',
    // enableSorting: is true by default
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Info'
        className='pl-5 text-orange-400'
      />
    ),
    cell: ({ row }) => (
      <div className='flex items-center p-1'>
        <Image
          src={row.original.img || '/noAvatar.png'}
          alt=''
          width={40}
          height={40}
          className='mr-4 h-10 w-10 rounded-full object-cover md:hidden xl:block'
        />
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{row.original.name}</h3>
          <p className='text-xs text-gray-500'>{row.original.email}</p>
        </div>
      </div>
    ),
    footer: 'Info'
  },

  {
    accessorKey: 'username',
    // enableSorting: is true by default
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Username'
        className='justify-start pl-2 text-orange-400'
      />
    ),
    cell: ({ row }) => (
      <div className={cn('rounded-lg p-2 text-left capitalize')}>
        {row.original.username}
      </div>
    )
  },

  {
    accessorKey: 'classes',
    // enableSorting: is true by default
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Classes'
        className='justify-start pl-2 text-orange-400'
      />
    ),
    cell: ({ row }) => (
      <div className={cn('rounded-lg p-2 capitalize')}>
        {row.original.classes.map(classItem => classItem.name).join(', ')}
      </div>
    )
  },

  {
    accessorKey: 'subjects',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Subjects'
        className='justify-start pl-2 text-orange-400'
      />
    ),
    cell: ({ row }) => (
      <div className={cn('rounded-lg p-2 capitalize')}>
        {row.original.subjects.map(subject => subject.name).join(', ')}
      </div>
    )
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

  createRowActions<TeacherList>()
]
