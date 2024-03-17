import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopularFilms } from "../../services/MyCinema/MyCinemaAction"
import { useNavigate } from "react-router-dom"

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
  return (
   <div>
    <h1 className="text-white text-2xl md:text-6xl font-mono mb-[20px]">{localStorage.getItem('#l34') === 'en' ? 'POPULAR' : 'Популярное'}</h1>
      <div className='flex flex-wrap justify-between gap-y-[20px] md:gap-8'>
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
