'use server'

import { revalidatePath } from 'next/cache'
import { addDays, addMonths, differenceInCalendarDays } from 'date-fns'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function addBook({
  name,
  isbn,
  noOfCopies,
  category,
  path,
  photos,
  publishYear,
  author
}: {
  name: string
  isbn: string
  noOfCopies: number
  category: number[]
  path: string
  photos: string[]
  publishYear: number
  author: string
}) {
  try {
    await prisma.$transaction(async t => {
      const book = await t.book.create({
        data: {
          name: name,
          isbn: isbn,
          noOfCopies: noOfCopies,
          publishYear: publishYear,
          author: author
        }
      })

      if (category && category.length > 0) {
        const data = category.map(cat => ({
          bookId: book.bookId,
          categoryId: cat
        }))

        await t.bookCategoryLink.createMany({ data })
      }

      // save photos
      if (photos && photos.length > 0) {
        const data = photos.map(photo => ({
          bookId: book.bookId,
          url: photo
        }))

        await t.bookPhoto.createMany({ data })
      }

      revalidatePath(path)
    })
  } catch (error) {
    throw error
  }
}

export async function updateBook({
  id,
  name,
  isbn,
  noOfCopies,
  category,
  path,
  publishYear,
  author
}: {
  id: number
  name: string
  isbn: string
  noOfCopies: number
  category: number[]
  path: string
  photos: string[]
  publishYear: number
  author: string
}) {
  try {
    await prisma.$transaction(async t => {
      const book = await t.book.update({
        where: {
          bookId: id
        },
        data: {
          name: name,
          isbn: isbn,
          noOfCopies: noOfCopies,
          publishYear: publishYear,
          author: author
        }
      })

      await t.bookCategoryLink.deleteMany({
        where: {
          bookId: id
        }
      })

      if (category && category.length > 0) {
        const data = category.map(cat => ({
          bookId: book.bookId,
          categoryId: cat
        }))

        await t.bookCategoryLink.createMany({ data })
      }

      revalidatePath(path)
    })
  } catch (error) {
    throw error
  }
}

export async function deleteBook(bookId: number, path: string) {
  await prisma.$transaction(
    async t =>
      await t.book.delete({
        where: {
          bookId: bookId
        }
      })
  )

  revalidatePath(path)
}

export async function placeHold(bookId: number, path: string) {
  // const session = await auth()

  // if (!session) {
  //   throw new Error('You must be logged in')
  // }

  //The unary plus (+) operator precedes its operand and evaluates to its operand but attempts to convert it into a number, if it isn't already.

  //Its called non-null assertion operator. Its telling the compiler that you are sure that the value won't be null or undefined. It's a way to assert to the TypeScript compiler that you've manually checked that a value isn't null and you're telling it to proceed without emitting a null check.

  await prisma.$transaction(t =>
    t.reservation.create({
      data: {
        bookId: +bookId,
        userId: bookId, // To change when auth available
        reservationDate: new Date(),
        expirationDate: addDays(new Date(), 15)
      }
    })
  )

  revalidatePath(path)
}

export async function cancelHold(id: number, path: string) {
  await prisma.$transaction(t =>
    t.reservation.delete({
      where: {
        reservationId: id
      }
    })
  )

  revalidatePath(path)
}
