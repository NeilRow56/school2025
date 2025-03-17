import { prisma } from '@/lib/prisma'

export async function deleteTeacher(id: string, path: string) {
  try {
    await prisma.$transaction([
      prisma.teacher.delete({
        where: {
          id: id
        }
      })
    ])
  } catch (error) {
    throw error
  }
}
