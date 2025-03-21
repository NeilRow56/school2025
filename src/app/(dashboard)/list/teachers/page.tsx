import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TableSearch from '@/components/shared/table-search'
import { role, teachersData } from '@/lib/constants/data'
import { EmptyState } from '@/components/shared/empty-state'

import DataTable2 from '@/components/shared/data-table2'
import { columns } from './teacherColumns'
import { DataTable } from '@/components/shared/data-table'
import TeachersTable from './teachers-table'

const TeachersListPage = () => {
  return (
    <div className='m-4 mt-0 flex-1 rounded-md bg-white p-4'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden text-lg font-semibold md:block'>All Teachers</h1>
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
              <Button
                asChild
                className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500'
              >
                <Link href='/manager/newManager'>
                  <PlusCircle className='text-black hover:text-white' />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}

      {teachersData === undefined || teachersData.length === 0 ? (
        <div className='container mx-auto mt-8'>
          <EmptyState
            title="You don't have any Teachers created"
            description="You currently don't have any Teachers. Once created you can
      see them here!"
            buttonText='Create Teacher'
            href='/teachers/newTeacher'
          />
        </div>
      ) : (
        <div className='container mx-auto mt-4'>
          <div className=''>
            <Card>
              <CardHeader>
                <CardTitle className='text-primary text-3xl font-bold'>
                  Teachers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TeachersTable />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeachersListPage
