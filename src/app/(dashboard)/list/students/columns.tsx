import { createRowActions } from '@/components/shared/data-table-actions'
import DataTableColumnHeader from '@/components/shared/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'

export type Student = {
  id: string
  username: string
  name: string
  surname: string
  email: string
  phone: string
  address: string
  img: string
  bloodType: string
  path: string
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    )
  },
  createRowActions<Student>()
]
