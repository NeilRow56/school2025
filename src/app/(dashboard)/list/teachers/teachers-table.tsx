'use client'

import React, { startTransition, useState } from 'react'

import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { DataTable } from '@/components/shared/data-table'
import ConfirmationDialog from '@/components/shared/confirmation-dialog'

import { deleteBook } from '@/app/actions/book_actions'

import { columns, Teacher } from './teacherColumns'
import { teachersData } from '@/lib/constants/data'
import { deleteTeacher } from '@/app/actions/teacher_actions'
// import { columns, Teacher } from './columns'

type props = {
  data: Teacher[]
}

function TeachersTable({ data }: { data: props }) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [itemToAction, setItemToAction] = useState<Teacher>()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleRowDelete = async (item: Teacher) => {
    setOpenConfirmationDialog(true)
    setItemToAction(item)
  }

  const handleRowEdit = (item: Teacher) => {
    setOpen(true)
    setItemToAction(item)
  }

  const handleConfirm = async () => {
    setOpenConfirmationDialog(false)

    if (itemToAction) {
      startTransition(async () => {
        await deleteTeacher(itemToAction.id, pathname)
      })

      toast(`${itemToAction.name} deleted`)
    }
  }
  return (
    <>
      <DataTable
        columns={columns}
        data={data.data}
        filter_column='name'
        onRowDelete={handleRowDelete}
        onRowEdit={handleRowEdit}
      />
      {/* <AddBookDialog open={open} setOpen={setOpen} book={itemToAction} /> */}
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        onConfirm={handleConfirm}
        message='By continuing you are going to delete the book, continue?'
      />
    </>
  )
}

export default TeachersTable
