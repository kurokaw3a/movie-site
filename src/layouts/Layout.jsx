import { Outlet, useParams } from 'react-router-dom'
import Header from '../components/UI/Header'

const Layout = () => {
  const { title } = useParams()
  return (
    <div className='pb-[50px]'>
      <div className={`flex justify-center ${title && 'md:block hidden'}`}>
        <Header />
      </div>
      <main className='flex justify-center m-[10px] md:m-[40px]'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
