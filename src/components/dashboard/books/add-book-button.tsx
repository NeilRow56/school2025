'use client'

import React, { useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddBookDialog from './add-book-dialog'

function AddBookButton() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button className='self-end' onClick={() => setOpen(true)}>
        <PlusIcon />
        Add book
      </Button>
      <AddBookDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default AddBookButton
