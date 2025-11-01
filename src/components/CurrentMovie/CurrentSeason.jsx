import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { getTvSeasonById } from '../../services/MyCinema/MyCinemaAction'
import Loader from '../UI/loader/Loader'
import { settingsSeason } from '../../constants/_slider'

const CurrentSeason = () => {
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
    <div>

    <div className='flex gap-4 md:gap-12 items-start font-["Inter"]'>
      <div className='max-w-96 flex-col'>
        <img
          className='max-w-[150px] md:max-w-96'
          src={`https://image.tmdb.org/t/p/w500${currentSeason.poster_path}`}
          alt='none'
          />
      </div>
      <div className='text-white flex flex-col gap-y-[30px]'>
        <div className='space-y-2'>
            <h1 className='text-xl md:text-4xl md:max-w-[800px]'>{currentSeason.title}</h1>
          <p className='text-white md:max-w-2xl text-sm md:text-xl'>
            {currentSeason.overview}
          </p>
        </div>
        <div className='hidden md:block'>
          <Slider {...settingsSeason} className='max-w-[500px] cursor-grab'>
            {currentSeason.episodes?.map((el, i) => (
              <div>
                <img
                  className='w-[500px] h-[290px]'
                  src={`https://image.tmdb.org/t/p/w500${el.still_path}`}
                  alt='none'
                  />
                <p>
                  {i + 1}.{el.name}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className='text-white ml-12 space-y-[50px] hidden md:block'>
        <div>
          <h1
            className={
              (currentSeason.vote_average?.toFixed(1) < 4 &&
              'text-red-400 text-4xl') ||
              (currentSeason.vote_average?.toFixed(1) > 7 &&
                'text-green-500 text-4xl font-semibold') ||
                'text-yellow-400 text-4xl'
            }
            >
            {currentSeason.vote_average?.toFixed(1)}
          </h1>
          <p className='text-xl'>
            {currentSeason.vote_count} {en ? 'votes' : 'голосов'}
          </p>
        </div>
      </div>
    </div>
    <div className='flex justify-center mt-[20px] md:hidden'>
    <div className='flex flex-col items-start gap-2 text-white'>
      <h1 className=' text-xl font-bold'>Episodes:</h1>
    <div>
          <Slider {...settingsSeason} className='max-w-[320px] cursor-grab'>
            {currentSeason.episodes?.map((el, i) => (
              <div>
                <img
                  className='w-[320px]'
                  src={`https://image.tmdb.org/t/p/w500${el.still_path}`}
                  alt='none'
                  />
                <p>
                  {i + 1}.{el.name}
                </p>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      </div>
      </div>
  )
}

export default CurrentSeason
