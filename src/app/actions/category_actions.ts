'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

////////////////////////////////////////////////////////////////////////////////
//              Category
////////////////////////////////////////////////////////////////////////////////

export async function addCategory(name: string, path: string) {
  try {
    const category = await prisma.$transaction([
      prisma.bookCategory.create({
        data: {
          category_name: name
        }
      })
    ])

    revalidatePath(path)
    return category
  } catch (error) {
    throw error
  }
}

export async function updateCategory(id: number, name: string, path: string) {
  if (!id) throw new Error('Missing id')
  try {
    await prisma.$transaction([
      prisma.bookCategory.update({
        where: {
          category_id: id
        },
        data: {
          category_name: name
        }
      })
    ])

    revalidatePath(path)
  } catch (error) {
    throw error
  }
}

export async function deleteCategory(id: number, path: string) {
  try {
    await prisma.$transaction([
      prisma.bookCategory.delete({
        where: {
          category_id: id
        }
      })
    ])

    revalidatePath(path)
  } catch (error) {
    throw error
  }
}

export async function getCategories(offset: number, limit: number) {
  try {
    let categories
    let total

    if (limit === -1) {
      categories = await prisma.bookCategory.findMany()
      total = categories.length
    } else {
      ;[categories, total] = await prisma.$transaction([
        prisma.bookCategory.findMany({ skip: offset, take: limit }),
        prisma.bookCategory.count()
      ])
    }

    return { data: categories, total: total }
  } catch (error) {
    throw error
  }
}
