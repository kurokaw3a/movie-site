import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularFilms } from "../../services/MyCinema/MyCinemaAction"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
   dispatch(getPopularFilms())
  },[dispatch])
  const {popularFilmsResult} = useSelector((state)=>state.cinema)
  const navToCurrentMovie = (title, id, type) => {
    navigate(`/${title}/${id}`)
    sessionStorage.setItem('tp34', type)
  }
  const location = useLocation()
  const selectLanguage = (e)=>{
   localStorage.setItem('#l34', e.target.value)
   dispatch(getPopularFilms())
  }
  return (
   <div>
    <div className="flex items-baseline justify-between">
    <h1 className="text-white text-2xl md:text-6xl font-mono mb-[20px]">{localStorage.getItem('#l34') === 'en' ? 'POPULAR' : 'Популярное'}</h1>
    {location.pathname === '/' && 
        <select className="outline-none bg-transparent text-white cursor-pointer" onChange={selectLanguage}>
          <option className="text-black" value="en" selected={localStorage.getItem('#l34') === 'en'}>English</option>
          <option className="text-black" value="ru" selected={localStorage.getItem('#l34') === 'ru'}>Русский</option>
        </select>
        }
        </div>
      <div className='flex flex-wrap justify-around md:justify-between gap-y-[20px] md:gap-8'>
              {popularFilmsResult?.map((el) => (
                <div  onClickCapture={() => navToCurrentMovie(el.title, el.id, el.type)}>
                  <img className='w-[165px] md:w-[250px]' src={el.poster} alt='none' />
                </div>
              ))}
            </div>
   </div>
  )
}

export default Main
