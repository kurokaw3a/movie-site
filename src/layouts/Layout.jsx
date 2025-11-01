import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/UI/Footer'
import Header from '../components/UI/Header'

const Layout = () => {
  const location = useLocation()
  // const { keyword } = useParams()
  return (
    <div>
      {/* {location.pathname === '/' && */}
      <div className='sticky top-0'>
    <Header/>
      </div>
  {/* } */}
  {/* {keyword && <HeaderSearch/>} */}
    <main className='m-[10px] md:m-[40px]'>
      <Outlet />
    </main>
    {location.pathname !== '/' && 
      <div className='md:hidden'>
      <Footer/>
      </div>
      }
    </div>
  )
}

export default Layout
