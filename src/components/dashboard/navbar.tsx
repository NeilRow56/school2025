import Header from './header'
import Navigation2 from './navigation2'

function Navbar() {
  return (
    <nav className='flex flex-col items-center 2xl:flex-row'>
      <Navigation2 />
      <Header />
    </nav>
  )
}

export default Navbar
