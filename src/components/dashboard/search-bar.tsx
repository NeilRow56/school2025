import React from 'react'
import Search from './search'

function SearchBar() {
  async function doSearch(formData: FormData) {
    'use server'
    const search_by = formData.get('search_by')
    const search = formData.get('search')

    console.log(search_by, search)
  }
  return (
    <form action={doSearch}>
      <Search />
    </form>
  )
}

export default SearchBar
