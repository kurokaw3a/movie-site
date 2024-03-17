import { Outlet, useLocation, useParams } from 'react-router-dom'
import FooterNav from '../components/UI/FooterNav'
import HeaderSearch from '../components/UI/HeaderSearch'

const Layout = () => {
  const location = useLocation()
  const { keyword } = useParams()
  return (
    <div>
      {location.pathname === '/' &&
      <div className='sticky top-0'>
    <HeaderSearch/>
      </div>
  }
  {keyword && <HeaderSearch/>}
    <main className='m-[10px] md:m-[40px]'>
      <Outlet />
    </main>
    {location.pathname !== '/' && 
      <div className='md:hidden'>
      <FooterNav/>
      </div>
      }
    </div>
  )
}

export default Layout
