import { useDispatch, useSelector } from 'react-redux'
import { MovieSeason } from '../components/Movie/Season'
import Loader from '../components/UI/loader/Loader'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getTvSeasonById } from '../services/MyCinema/MyCinemaAction'

export const SeasonPage = () => {
  const { currentSeason, currentSeasonStatus } = useSelector(
    (state) => state.cinema
  )
  const { title, id, season } = useParams()
  const en = /[A-za-zA-Z]/.test(title.slice(0, 6))
  const ru = /[А-яа-яА-Я]/.test(title.slice(0, 6))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getTvSeasonById({
        id,
        season,
        language: (en && 'en') || (ru && 'ru'),
      })
    )
  }, [dispatch, id, season, en, ru])

  return currentSeasonStatus === 'pending' ? (
    <Loader />
  ) : (
    <MovieSeason season={currentSeason} lang={en} />
  )
}
