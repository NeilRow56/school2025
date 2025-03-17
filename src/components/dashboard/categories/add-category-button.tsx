'use client'

import React, { useState } from 'react'

import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import AddCategoryDialog from './add-category-dialog'

function AddCategoryButton() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button className='self-end' onClick={() => setOpen(true)}>
        <PlusIcon />
        Add category
      </Button>
      <AddCategoryDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default AddCategoryButton
