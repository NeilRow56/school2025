'use client'

import React, { startTransition, useState } from 'react'
import { Category, columns } from './columns'

import { usePathname } from 'next/navigation'

import { toast } from 'sonner'
import { deleteCategory } from '@/app/actions/category_actions'
import { DataTable } from '@/components/shared/data-table'
import AddCategoryDialog from '@/components/dashboard/categories/add-category-dialog'
import ConfirmationDialog from '@/components/shared/confirmation-dialog'

type props = {
  data: {
    category_id: number
    category_name: string
  }[]
  total: number
}
function CategoriesTable({ data }: { data: props }) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [itemToAction, setItemToAction] = useState<Category>()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleRowDelete = (item: Category) => {
    setOpenConfirmationDialog(true)
    setItemToAction(item)
  }

  const handleRowEdit = (item: Category) => {
    setItemToAction(item)
    setOpen(true)
  }

  const handleConfirm = async () => {
    setOpenConfirmationDialog(false)

    if (itemToAction) {
      startTransition(async () => {
        await deleteCategory(itemToAction.category_id, pathname)
      })

      toast(`${itemToAction.category_name} deleted`)
    }
  }

  return (
    <>
      <DataTable
        data={data.data}
        columns={columns}
        total={data.total}
        filter_column='category_name'
        onRowDelete={handleRowDelete}
        onRowEdit={handleRowEdit}
      />
      <AddCategoryDialog
        open={open}
        setOpen={setOpen}
        category={itemToAction}
      />
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        onConfirm={handleConfirm}
        message='By continuing you are going to delete the category, continue?'
      />
    </>
  )
}

export default CategoriesTable
