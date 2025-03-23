// 'use client'
import React from 'react'
import SearchBar from './search-bar'

function Header() {
  return (
    <>
      <header className='container mx-auto p-2 2xl:border-b'>
        {/* mobile */}
        <div className='flex flex-col justify-between p-6 sm:hidden'>
          <div className='flex items-center'>
            {/* logo */}
            {/* sidebar trigger */}
            Sidebar Trigger
          </div>
          <SearchBar />
        </div>

        {/* desktop */}
        <div className='hidden items-center justify-between gap-2 p-2 sm:flex'>
          {/* logo */}

          <SearchBar />
        </div>
      </header>
    </>
  )
}

export default Header
