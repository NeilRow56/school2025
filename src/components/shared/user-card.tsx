import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface UserCardProps {
  type: 'administrator' | 'teacher' | 'student' | 'parent'
}

const UserCard = async ({ type }: UserCardProps) => {
  return (
    <div className='odd:bg-lamaPurple even:bg-lamaYellow min-w-[130px] flex-1 rounded-2xl p-4'>
      <div className='flex items-center justify-between'>
        <span className='rounded-full bg-white px-2 py-1 text-[10px] text-green-700'>
          2024/25
        </span>
        <MoreHorizontal className='text-muted-foreground' />
      </div>
      <h2 className='my-4 text-2xl font-semibold'>DATA</h2>
      <h3 className='bg-lama-yellow text-sm font-medium text-gray-500 capitalize'>
        <span className='text-sm'>{type}s</span>
      </h3>
    </div>
  )
}

export default UserCard
