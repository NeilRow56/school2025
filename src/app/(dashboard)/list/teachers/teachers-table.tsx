'use client'

import ConfirmationDialog from '@/components/shared/confirmation-dialog'
import { DataTable } from '@/components/shared/data-table'
import { usePathname } from 'next/navigation'
import { startTransition, useState } from 'react'
import { toast } from 'sonner'
import { columns, Teacher } from './columns'

type props = {
  data: {
    username: string
    name: string
    surname: string
    bloodType: string
  }[]
  total: number
}
const TeachersTable = ({ data }: { data: props }) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [itemToAction, setItemToAction] = useState<Teacher>()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleRowDelete = (item: Teacher) => {
    setOpenConfirmationDialog(true)
    setItemToAction(item)
  }

  const handleRowEdit = (item: Teacher) => {
    setItemToAction(item)
    setOpen(true)
  }

  const handleConfirm = async () => {
    setOpenConfirmationDialog(false)

    //   if (itemToAction) {
    //     startTransition(async () => {
    //       await deleteCategory(itemToAction.category_id, pathname)
    //     })

    //     toast(`${itemToAction.category_name} deleted`)
    //   }
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

      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        onConfirm={handleConfirm}
        message='By continuing you are going to delete the teacher, continue?'
      />
    </>
  )
}

export default TeachersTable
