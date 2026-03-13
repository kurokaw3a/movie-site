import { useSelector } from 'react-redux'
import { MovieInfo } from '../components/Movie/Info'
import Loader from '../components/UI/loader/Loader'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFilmById, getTvById } from '../services/MyCinema/MyCinemaAction'
import { MovieSeasonsList } from '../components/Movie/Seasons'
import { MovieTrailers } from '../components/Movie/Trailers'

export const MoviePage = () => {
  const { title, type, id } = useParams()
  const en = /[A-za-zA-Z]/.test(title.slice(0, 6))
  const ru = /[А-яа-яА-Я]/.test(title.slice(0, 6))

  const dispatch = useDispatch()

  useEffect(() => {
    if (type === 'movie') {
      dispatch(
        getFilmById({
          id,
          language: (en && 'en') || (ru && 'ru'),
        })
      )
    }
    if (type === 'tv') {
      dispatch(
        getTvById({
          id,
          language: (en && 'en') || (ru && 'ru'),
        })
      )
    }
  }, [dispatch, type, id, en, ru])
  const { currentMovie, currentMovieStatus } = useSelector(
    (state) => state.cinema
  )
  return currentMovieStatus === 'pending' ? (
    <Loader />
  ) : (
    <div>
      <div className='md:flex'>
        <MovieInfo movie={currentMovie} lang={en} />
        <MovieSeasonsList movie={currentMovie} />
      </div>
      <MovieTrailers movie={currentMovie} />
    </div>
  )
}
