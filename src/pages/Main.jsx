import Main from '../components/Main/Main'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularFilms } from '../services/MyCinema/MyCinemaAction'
import Loader from '../components/UI/loader/Loader'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { popularFilmsResult, popularFilmsStatus } = useSelector(
    (state) => state.cinema
  )
  const [page, setPage] = useState(
    parseInt(sessionStorage.getItem('page')) || 1
  )
  useEffect(() => {
    dispatch(getPopularFilms({ page }))
  }, [page, dispatch])

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

  const selectLanguage = (e) => {
    localStorage.setItem('#l34', e.target.value)
    dispatch(getPopularFilms({ page }))
  }

  return popularFilmsStatus === 'pending' ? (
    <Loader />
  ) : (
    <div>
      <Main
        list={popularFilmsResult}
        selectLanguage={selectLanguage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  )
}
