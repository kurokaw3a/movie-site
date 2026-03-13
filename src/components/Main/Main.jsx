import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularFilms } from '../../services/MyCinema/MyCinemaAction'
import { useLocation, useNavigate } from 'react-router-dom'
import { whichLang } from '../../constants/_language'
import { Select } from '../UI/Select'

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(parseInt(sessionStorage.getItem("page")) || 1)
  useEffect(() => {
    dispatch(getPopularFilms({ page }))
  }, [page])
  const { popularFilmsResult } = useSelector((state) => state.cinema)
  const navToCurrentMovie = (title, type, id) => {
    navigate(`/${title}/${type}/${id}`)
  }
  const location = useLocation()
  const selectLanguage = (e) => {
    localStorage.setItem('#l34', e.target.value)
    dispatch(getPopularFilms({ page }))
  }
  const selectGenre = (e) => {
    dispatch()
  }
  const nextPage = () => {
    setPage((prev) => prev + 1)
    sessionStorage.setItem('page', page + 1)
  }
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
      sessionStorage.setItem('page', page - 1)
    }
  }

  return (
    <div>
      <div className='flex items-baseline justify-between'>
        <h1 className="text-white text-2xl md:text-3xl font-['Inter'] mb-[20px]">
          {whichLang() ? 'В тренде' : 'Trending Now'}
        </h1>
        {/* <div className='flex items-center gap-[5px]'>
          <p className='text-white'>Жанры:</p>
          <Select variant='language'>
            <option className='text-black'>Боевик</option>
            <option className='text-black'>Комедия</option>
            <option className='text-black'>Драма</option>
            <option className='text-black'>Триллер</option>
            <option className='text-black'>Ужастик</option>
            <option className='text-black'>Научное</option>
            <option className='text-black'>Фентези</option>
            <option className='text-black'>Аниме</option>
          </Select>
        </div> */}
        <div className='flex items-center gap-[50px]'>
          <div className='flex items-center gap-[5px] text-white'>
            <h1 className='text-[20px] cursor-pointer' onClick={prevPage}>
              ←
            </h1>
            <h1>{page}</h1>
            <h1 className='text-[20px] cursor-pointer' onClick={nextPage}>
              →
            </h1>
          </div>
          {location.pathname === '/' && (
            <Select variant='language' onChange={selectLanguage}>
              <option className='text-black' value='en' selected={whichLang()}>
                English
              </option>
              <option className='text-black' value='ru' selected={whichLang()}>
                Русский
              </option>
            </Select>
          )}
        </div>
      </div>

      <div className='flex flex-wrap justify-between gap-y-[20px]'>
        {popularFilmsResult?.map((el) => (
          <div
            onClickCapture={() => navToCurrentMovie(el.title, el.type, el.id)}
          >
            <img
              className='w-[165px] md:w-[225px] cursor-pointer'
              src={el.poster}
              alt='none'
            />
          </div>
        ))}
      </div>
      {/* <h1 onClick={()=>{dispatch(getPopularFilms({page}))}} className='text-white text-center'>more</h1> */}
    </div>
  )
}

export default Main
