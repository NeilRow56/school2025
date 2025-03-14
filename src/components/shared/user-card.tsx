import { MoreHorizontalIcon } from 'lucide-react'

import React from 'react'

interface UserCardProps {
  type: 'administrator' | 'teacher' | 'student' | 'parent'
}

const UserCard = async ({ type }: UserCardProps) => {
  return (
    <div className='odd:bg-lama-purple even:bg-lama-yellow min-w-[130px] flex-1 rounded-2xl p-4'>
      <div className='flex items-center justify-between'>
        <span className='rounded-full bg-white px-2 py-1 text-[10px] text-green-600'>
          2024/25
        </span>
        <MoreHorizontalIcon className='text-muted-foreground' />
      </div>
      <h1 className='my-4 text-2xl font-semibold'>1,234</h1>
      <h2 className='text-sm font-medium text-gray-500 capitalize'>{type}s</h2>
    </div>
  )
}

export default UserCard
