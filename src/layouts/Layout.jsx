import { Outlet, useLocation, useParams } from 'react-router-dom'
import Footer from '../components/UI/Footer'
import Header from '../components/UI/Header'

const Layout = () => {
  const location = useLocation()
  const { title } = useParams()
  return (
    <div className='pb-[50px]'>
      <div className={`sticky top-0 ${title && 'md:block hidden'}`}>
        <Header />
      </div>
      <main className='m-[10px] md:m-[40px]'>
        <Outlet />
      </main>
      {location.pathname !== '/' && (
        <div className='md:hidden'>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Layout
