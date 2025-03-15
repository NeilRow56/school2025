import Pagination from '@/components/shared/pagination'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TeachersListPage = () => {
  return (
    <div className='m-4 mt-0 flex-1 rounded-md bg-white p-4'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden text-lg font-semibold md:block'>All Teachers</h1>
        <div className='flex w-full flex-col items-center gap-4 md:w-auto md:flex-row'>
          {/* <TableSearch /> */}
          TABLE SEARCH
          <div className='flex items-center gap-4 self-end'>
            <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>

            <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400'>
              <Plus />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      TABLE
      {/* PAGINATION */}
      <Pagination />
      PAGINATION
    </div>
  )
}

export default TeachersListPage
