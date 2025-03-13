import { AdminSidebar } from '@/components/dashboard/admin-sidebar'
import Navbar from '@/components/dashboard/navbar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb className='text-primary hidden text-xl md:block'>
            Your local library online!
          </Breadcrumb>
        </header>
        <div>
          <Navbar />
        </div>
        <main className='container'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
