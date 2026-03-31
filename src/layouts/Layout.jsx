import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/UI/Header'
import { useDispatch } from 'react-redux'
import { MyCinemaSlice } from '../services/MyCinema/MyCinemaSlice'

const Layout = () => {
  const { title } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchFilm = (event) => {
    event.preventDefault()
    dispatch(MyCinemaSlice.actions.clear())
    if (event.target[0]?.value?.trim()?.length >= 2) {
      navigate(`search/${event.target[0]?.value}`)
    }
  }
  return (
    <div className='pb-[50px]'>
      <div className={`flex justify-center ${title && 'md:block hidden'}`}>
        <Header searchFilm={searchFilm} />
      </div>
      <main className='flex justify-center m-[10px] md:m-[40px]'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
