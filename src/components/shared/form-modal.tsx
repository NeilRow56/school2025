'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useState } from 'react'

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import('../forms/teacher-form'), {
  loading: () => <h1>Loading...</h1>
})
// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

const forms: {
  [key: string]: (type: 'create' | 'update', data?: never) => React.JSX.Element
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />
  //   student: (type, data) => <StudentForm type={type} data={data} />
}

const FormModal = ({
  table,
  type,
  data,
  id
}: {
  table:
    | 'teacher'
    | 'student'
    | 'parent'
    | 'subject'
    | 'class'
    | 'lesson'
    | 'exam'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement'
  type: 'create' | 'update' | 'delete'
  data?: never
  id?: number
}) => {
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
  const bgColor =
    type === 'create'
      ? 'bg-lamaYellow'
      : type === 'update'
        ? 'bg-lamaSky'
        : 'bg-lamaPurple'

  const [open, setOpen] = useState(false)

  const Form = () => {
    return type === 'delete' && id ? (
      <form action='' className='flex flex-col gap-4 p-4'>
        <span className='text-center font-medium'>
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className='w-max self-center rounded-md border-none bg-red-700 px-4 py-2 text-white'>
          Delete
        </button>
      </form>
    ) : type === 'create' || type === 'update' ? (
      forms[table](type, data)
    ) : (
      'Form not found!'
    )
  }

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt='' width={16} height={16} />
      </button>
      {open && (
        <div className='bg-opacity-60 absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black'>
          <div className='relative w-[90%] rounded-md bg-white p-4 md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            <Form />
            <div
              className='absolute top-4 right-4 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              <Image src='/close.png' alt='' width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal
