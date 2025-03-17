import { prisma } from '@/lib/prisma'
import React from 'react'
import TeachersTable from './teachers-table'

async function TeachersPage({
  searchParams
}: {
  searchParams: Promise<{ page: string; limit: string }>
}) {
  const params = await searchParams
  const offset = parseInt(params.page || '1')
  const take = parseInt(params.limit || '10')

  const [teachers, total] = await prisma.$transaction([
    prisma.teacher.findMany({
      skip: offset,
      take: take,
      select: {
        username: true,
        name: true,
        surname: true,
        bloodType: true
      }
    }),
    prisma.teacher.count()
  ])

  return (
    <div className='container mx-auto flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>ADD TEACHER</div>

      <TeachersTable data={{ data: teachers, total: total }} />
    </div>
  )
}

export default TeachersPage
