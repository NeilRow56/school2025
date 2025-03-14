import UserCard from '@/components/shared/user-card'

const AdminPage = () => {
  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      {/* Left */}
      <div className='flex w-full flex-col gap-8 lg:w-2/3'>
        {/* USER CARDS */}
        <div className='flex flex-wrap justify-between gap-4'>
          <UserCard type='student' />
          <UserCard type='teacher' />
          <UserCard type='parent' />
          <UserCard type='administrator' />
        </div>
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3'>R</div>
    </div>
  )
}

export default AdminPage
