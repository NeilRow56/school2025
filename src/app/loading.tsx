import Image from 'next/image'
import loader from '@/assets/loader.gif'

const Loading = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Image src={loader} height={50} width={50} alt='Loading...' />
    </div>
  )
}

export default Loading
