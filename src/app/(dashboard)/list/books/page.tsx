import React from 'react'

import CatalogTable from './catalog-table'
import { prisma } from '@/lib/prisma'
import AddBookButton from '@/components/dashboard/books/add-book-button'

async function BookPage() {
  const [books, total] = await prisma.$transaction([
    prisma.book.findMany({
      select: {
        bookId: true,
        name: true,
        noOfCopies: true,
        isbn: true,
        isActive: true,
        publishYear: true,
        author: true,
        // bookPhotos: {
        //   select: {
        //     photoId: true,
        //     url: true
        //   }
        // },
        bookCategoryLinks: {
          select: {
            categoryId: true
          }
        }
      }
    }),
    prisma.book.count()
  ])

  return (
    <div className='flex flex-col space-y-4 p-2'>
      <div className='flex w-full justify-end'>
        <AddBookButton />
      </div>
      <CatalogTable data={{ data: books, total: total }} />
    </div>
  )
}

export default BookPage
