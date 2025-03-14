import Announcements from '@/components/dashboard/announcements'
import AttendanceChart from '@/components/dashboard/attendance-chart'
import CountChart from '@/components/dashboard/count-chart'
import EventCalendar from '@/components/dashboard/event-calendar'
import UserCard from '@/components/shared/user-card'

const AdminPage = () => {
  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      {/* Left */}
      <div className='lg:w-2/3px-4 flex w-full flex-col gap-8'>
        {/* USER CARDS */}
        <div className='flex flex-wrap justify-between gap-4'>
          <UserCard type='student' />
          <UserCard type='teacher' />
          <UserCard type='parent' />
          <UserCard type='administrator' />
        </div>
        {/* MIDDLE CHARTS */}
        <div className='flex flex-col gap-4 lg:flex-row'>
          {/* COUNT CHART */}
          <div className='h-[450px] w-full lg:w-1/3'>
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className='h-[450px] w-full lg:w-2/3'>
            <AttendanceChart />
          </div>
        </div>
      </div>
      {/* Right */}
      <div className='flex w-full flex-col gap-8 lg:w-1/3'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  )
}

export default AdminPage
