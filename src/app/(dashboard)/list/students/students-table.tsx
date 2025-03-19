'use client'

import React, { startTransition, useState } from 'react'
import { Student, columns } from './columns'

import { usePathname } from 'next/navigation'

import { toast } from 'sonner'

import { DataTable } from '@/components/shared/data-table'

import { deleteStudent } from '@/app/actions/student_actions'

type props = {
  data: {
    id: string
    username: string
    name: string
    surname: string
    email: string
    phone: string
    address: string
    img: string
    bloodType: string
    sex: 'MALE'

    parentId: string
    classId: string
    gradeId: string

    path: string
  }[]
  total: number
}
function StudentsTable({ data }: { data: props }) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [itemToAction, setItemToAction] = useState<Student>()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleRowDelete = (item: Student) => {
    setOpenConfirmationDialog(true)
    setItemToAction(item)
  }

  const handleRowEdit = (item: Student) => {
    setItemToAction(item)
    setOpen(true)
  }

  const handleConfirm = async () => {
    setOpenConfirmationDialog(false)

    if (itemToAction) {
      startTransition(async () => {
        await deleteStudent(itemToAction.id, pathname)
      })

      toast(`${itemToAction.name} deleted`)
    }
  }

  return (
    <>
      <DataTable
        data={data.data}
        columns={columns}
        total={data.total}
        filter_column='name'
        onRowDelete={handleRowDelete}
        onRowEdit={handleRowEdit}
      />
      {/* <AddStudentDialog
        open={open}
        setOpen={setOpen}
        student={itemToAction}
      />
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        onConfirm={handleConfirm}
        message='By continuing you are going to delete the student, continue?'
      /> */}
    </>
  )
}

export default StudentsTable
