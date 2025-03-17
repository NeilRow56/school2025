import { prisma } from '@/lib/prisma'

const TeacherPage = async () => {
  const teachers = await prisma.teacher.findMany()
  console.log(teachers)
  return (
    <div>
      <h1>Teacher Page</h1>
    </div>
  )
}

export default TeacherPage
