'use server'

import { revalidatePath } from 'next/cache'

import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function updateStudent(id: string, name: string, path: string) {
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
  try {
    await prisma.$transaction([
      prisma.student.delete({
        where: {
          id: id
        }
      })
    ])

    revalidatePath(path)
  } catch (error) {
    throw error
  }
}
