import AddCategoryButton from '@/components/dashboard/categories/add-category-button'
import { prisma } from '@/lib/prisma'
import React from 'react'
import StudentsTable from './students-table'

async function StudentsListPage() {
  const [students, total] = await prisma.$transaction([
    prisma.student.findMany(),
    prisma.student.count()
  ])

  console.log(students)
  return (
    <div className='container mx-auto flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>
        <AddCategoryButton />
      </div>

      {/* <StudentsTable data={{ data: students, total: total }} /> */}
    </div>
  )
}

export default StudentsListPage
