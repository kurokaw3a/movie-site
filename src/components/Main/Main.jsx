import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularFilms } from "../../services/MyCinema/MyCinemaAction"
import { useLocation, useNavigate } from "react-router-dom"
import { whichLang } from "../../constants/_language"

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
   dispatch(getPopularFilms())
  },[dispatch])
  const {popularFilmsResult} = useSelector((state)=>state.cinema)
  const navToCurrentMovie = (title, type, id) => {
    navigate(`/${title}/${type}/${id}`)
  }
  const location = useLocation()
  const selectLanguage = (e)=>{
   localStorage.setItem('#l34', e.target.value)
   dispatch(getPopularFilms())
  }
  
  return (
   <div>
    <div className="flex items-baseline justify-between">
    <h1 className="text-white text-2xl md:text-3xl font-['Inter'] mb-[20px]">{whichLang() ? 'В тренде' : 'Trending Now'}</h1>
    {location.pathname === '/' && 
        <select className="outline-none bg-transparent text-white cursor-pointer" onChange={selectLanguage}>
          <option className="text-black" value="en" selected={whichLang()}>English</option>
          <option className="text-black" value="ru" selected={whichLang()}>Русский</option>
        </select>
        }
        </div>
      <div className='flex flex-wrap justify-between gap-y-[20px]'>
              {popularFilmsResult?.map((el) => (
                <div onClickCapture={() => navToCurrentMovie(el.title, el.type, el.id)}>
                  <img className='w-[165px] md:w-[225px] cursor-pointer' src={el.poster} alt='none' />
                </div>
              ))}
            </div>
   </div>
  )
}

export default Main
