import AddCategoryButton from '@/components/dashboard/categories/add-category-button'
import { prisma } from '@/lib/prisma'
import React from 'react'
import CategoriesTable from './categories-table'

async function CategoriesPage() {
  // const params = await searchParams
  // const offset = parseInt(params.page || '0')
  // const take = parseInt(params.limit || '10')

  const [categories] = await prisma.$transaction([
    prisma.bookCategory.findMany()
  ])

  return (
    <div className='container mx-auto flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>
        <AddCategoryButton />
      </div>

      <CategoriesTable data={{ data: categories }} />
    </div>
  )
}

export default CategoriesPage
