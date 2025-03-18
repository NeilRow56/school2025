'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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

export async function updateStudent({
  id,
  username,
  name,
  surname,
  email,
  phone,
  address,
  img,
  bloodType,
  path
}: {
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
}) {
  if (!id) throw new Error('Missing id')
  try {
    await prisma.$transaction([
      prisma.student.update({
        where: {
          id: id
        },
        data: {
          name: name
        }
      })
    ])

    revalidatePath(path)
  } catch (error) {
    throw error
  }
}

export async function deleteStudent(id: string, path: string) {
  await prisma.$transaction(
    async t =>
      await t.student.delete({
        where: {
          id: id
        }
      })
  )

  revalidatePath(path)
}
