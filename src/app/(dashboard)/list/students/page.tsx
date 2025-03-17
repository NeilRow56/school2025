import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/empty-state'
import { role, studentsData } from '@/lib/constants/data'
import TableSearch from '@/components/shared/table-search'
import StudentsDataTable from './students-data-table'
import { columns } from './studentColumns'
import { prisma } from '@/lib/prisma'
import { Class, Student } from '@prisma/client'

type StudentList = Student & { class: Class }

const StudentsListPage = async () => {
  const studentsData = await prisma.student.findMany()
  return (
    <div className='m-4 mt-0 flex-1 rounded-md bg-white p-4'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        {/* <h1 className="hidden text-lg font-semibold md:block">All Managers</h1> */}
        <div />
        <div className='flex w-full flex-col items-center gap-4 md:w-auto md:flex-row'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>
            {role === 'admin' && (
              <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500'>
                <PlusCircle />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}

      {studentsData === undefined || studentsData.length === 0 ? (
        <div className='container mx-auto mt-8'>
          <EmptyState
            title="You don't have any Team Members created"
            description="You currently don't have any team members. Once created you can
      see them here!"
            buttonText='Create Team Member'
            href='/team/newTeamMember'
          />
        </div>
      ) : (
        <div className='container mx-auto mt-4'>
          <div className=''>
            <Card>
              <CardHeader>
                <CardTitle className='text-primary text-3xl font-bold'>
                  Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudentsDataTable data={studentsData} columns={columns} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsListPage
