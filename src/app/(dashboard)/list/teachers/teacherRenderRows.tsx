import FormModal from '@/components/shared/form-modal'
import { role } from '@/lib/constants/data'
import { Teacher } from '@/types/teacher-types'
import Image from 'next/image'
import Link from 'next/link'

export const renderRow = (item: Teacher) => (
  <tr
    key={item.id}
    className='hover:bg-lamaPurpleLight border-b border-gray-200 text-sm even:bg-slate-50'
  >
    <td className='flex items-center gap-4 p-4'>
      <Image
        src={item.photo}
        alt=''
        width={40}
        height={40}
        className='h-10 w-10 rounded-full object-cover md:hidden xl:block'
      />
      <div className='flex flex-col'>
        <h3 className='font-semibold'>{item.name}</h3>
        <p className='text-xs text-gray-500'>{item?.email}</p>
      </div>
    </td>
    <td className='hidden md:table-cell'>{item.id}</td>
    <td className='hidden md:table-cell'>{item.subjects.join(',')}</td>
    <td className='hidden md:table-cell'>{item.classes.join(',')}</td>
    <td className='hidden md:table-cell'>{item.phone}</td>
    <td className='hidden md:table-cell'>{item.address}</td>
    <td>
      <div className='flex items-center gap-2'>
        <Link href={`/list/teachers/${item.id}`}>
          <button className='bg-lamaSky flex h-7 w-7 items-center justify-center rounded-full'>
            <Image src='/view.png' alt='' width={16} height={16} />
          </button>
        </Link>
        {role === 'admin' && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          //   <Image src="/delete.png" alt="" width={16} height={16} />
          // </button>
          <FormModal table='teacher' type='delete' id={item.id} />
        )}
      </div>
    </td>
  </tr>
)
