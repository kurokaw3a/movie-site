import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { searchFilm } from '../services/MyCinema/MyCinemaAction'
import { MyCinemaSlice } from '../services/MyCinema/MyCinemaSlice'
import Loader from '../components/UI/loader/Loader'
import Results from '../components/Main/Results'
import { whichLang } from '../constants/_language'

export const ResultsPage = () => {
  const { searchResult, searchStatus } = useSelector((state) => state.cinema)
  const { keyword } = useParams()
  const en = /[A-za-zA-Z]/
  const ru = /[А-яа-яА-Я]/
  const language = (en.test(keyword) && 'en') || (ru.test(keyword) && 'ru')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      searchFilm({
        name: keyword,
        language,
      })
    )
  }, [keyword, language, dispatch])
  const location = useLocation()
  useEffect(() => {
    dispatch(MyCinemaSlice.actions.clear())
  }, [location.pathname, dispatch])
  return searchStatus === 'pending' ? (
    <Loader />
  ) : searchStatus === 'success' ? (
    <Results list={searchResult} />
  ) : searchStatus === 'error' ? (
    <h1 className='text-white'>
      {whichLang() ? 'Ничего не найдено' : 'Not found'}
    </h1>
  ) : ""
}
