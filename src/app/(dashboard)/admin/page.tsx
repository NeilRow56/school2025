import UserCard from '@/components/shared/user-card'

const AdminPage = () => {
  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      {/* Left */}
      <div className='w-full lg:w-2/3'>
        {/* User Cards */}
        <UserCard type='teacher' />
        <UserCard type='parent' />
        <UserCard type='administrator' />
        <UserCard type='student' />
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3'>R</div>
    </div>
  )
}

export default AdminPage
