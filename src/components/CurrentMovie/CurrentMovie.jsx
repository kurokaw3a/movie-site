import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { getFilmById, getTvById } from '../../services/MyCinema/MyCinemaAction'
import Loader from '../UI/loader/Loader'

function SampleArrow() {
  return <div />
}
const CurrentMovie = () => {
  const { currentMovie, currentMovieStatus } = useSelector(
    (state) => state.cinema
  )
  const { title, id } = useParams()
  const en = /[A-za-zA-Z]/.test(title.slice(0, 6))
  const ru = /[А-яа-яА-Я]/.test(title.slice(0, 6))
  const dispatch = useDispatch()
  useEffect(() => {
    if (sessionStorage.getItem('tp34') === 'movie') {
      dispatch(
        getFilmById({
          id,
          language: (en && 'en') || (ru && 'ru'),
        })
      )
    }
    if (sessionStorage.getItem('tp34') === 'tv') {
      dispatch(
        getTvById({
          id,
          language: (en && 'en') || (ru && 'ru'),
        })
      )
    }
  }, [dispatch, id, en ,ru])
  const navigate = useNavigate()
  const navToCurrentSeason = (season) => {
    navigate(`${season}`)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
  }
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
  }
  console.log(currentMovie);
  return currentMovieStatus === 'pending' ? (
    <Loader />
  ) : (
    <div>
    <div className='flex gap-4 md:gap-12 items-start font-[sans]'>
      <div className='max-w-96 flex-col'>
        <img
          className='max-w-[150px] md:max-w-96'
          src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
          alt='none'
        />
        {currentMovie.runtime ? (
          <p className='text-white text-sm md:text-xl text-center'>
            -----{' '}
            {Math.floor(currentMovie.runtime / 60) !== 0 &&
              `${Math.floor(currentMovie.runtime / 60)}${en ? 'h' : 'ч'}`}{' '}
            {currentMovie.runtime % 60}
            {en ? 'm' : 'м'} -----
          </p>
        ) : (
          <p className='text-white text-sm md:text-xl text-center'>
            {currentMovie.number_of_seasons}
            {en
              ? 'season'
              : currentMovie.number_of_seasons < 2
              ? 'сезон'
              : 'сезона'}{' '}
            / {currentMovie.number_of_episodes}
            {en
              ? 'episodes'
              : currentMovie.number_of_seasons < 2
              ? 'серий'
              : 'серии'}
          </p>
        )}
          <div className='text-white flex items-baseline justify-center gap-2 md:hidden'>
          <h1
            className={
              (currentMovie.vote_average?.toFixed(1) < 4 &&
              'text-red-400 text-xl md:text-4xl') ||
              (currentMovie.vote_average?.toFixed(1) > 7 &&
                'text-green-500 text-xl md:text-4xl font-semibold') ||
              'text-yellow-400 text-xl md:text-4xl'
            }
            >
            {currentMovie.vote_average?.toFixed(1)}
          </h1>
          <p className='text-sm'>
            {currentMovie.vote_count} {en ? 'votes' : 'голосов'}
          </p>
        </div>
      </div>
      <div className='md:h-[576px] text-white md:flex md:flex-col md:justify-between'>
        <div className='space-y-1 md:space-y-2'>
          <div>
            <h1 className='md:text-4xl md:max-w-[800px] text-xl'>{currentMovie.title}</h1>
            {currentMovie.tagline && (
              <p className='text-cyan-200 text-[12px] md:text-lg md:max-w-[800px]'>
                {currentMovie.tagline}
              </p>
            )}
          </div>
          <p className='text-white md:max-w-2xl max-h-[125px] md:max-h-[90px] overflow-auto text-sm md:text-xl'>
            {currentMovie.overview}
          </p>
          <div className='md:flex md:justify-between md:items-baseline md:max-w-[600px] text-white md:text-3xl'>
            <div className='flex gap-1 text-white text-lg md:text-3xl'>
              <h1>{currentMovie.release_date?.slice(0, 4)}</h1>
              <h1>/</h1>
              <h1>{currentMovie?.production_countries?.[0]?.iso_3166_1}</h1>
            </div>
            <div className='flex gap-2 text-white flex-wrap'>
              {currentMovie?.genres?.map((el) => (
                <h5 className='text-[12px] md:text-lg'>{el.name}</h5>
                ))}
            </div>
          </div>
        </div>
        <div className='hidden md:block md:mt-[5px]'>
          {currentMovie.videos?.key ? (
            <ReactPlayer
            url={`https://www.youtube.com/embed/${currentMovie.videos?.key}`}
              controls
              width={600}
              height={370}
              />
              ) : (
                <Slider {...settings} className='max-w-[600px] cursor-grab'>
              {currentMovie.images?.map((el) => (
                <div>
                  <img className='w-[599px]' src={el} alt='' />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <div className='text-white ml-12 space-y-[50px] hidden md:block'>
        <div>
          <h1
            className={
              (currentMovie.vote_average?.toFixed(1) < 4 &&
              'text-red-400 text-4xl') ||
              (currentMovie.vote_average?.toFixed(1) > 7 &&
                'text-green-500 text-4xl font-semibold') ||
              'text-yellow-400 text-4xl'
            }
            >
            {currentMovie.vote_average?.toFixed(1)}
          </h1>
          <p className='text-xl'>
            {currentMovie.vote_count} {en ? 'votes' : 'голосов'}
          </p>
        </div>
        <div className='max-h-[500px] overflow-y-auto'>
          {currentMovie.seasons?.map((el) => (
             el.poster_path && (
              <div
              className='flex flex-col items-center'
              onClickCapture={() => navToCurrentSeason(el.season_number)}
              >
                  <img
                    className='w-[250px]'
                    src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                    alt='none'
                    />
                  <h1 className='mb-[10px]'>{el.name}</h1>
                </div>
              )
              )
          )}
        </div>
      </div>
    </div>
    <div className='md:hidden flex justify-center'>
    <div className='mt-[20px] flex flex-col'>
      <div>
          {currentMovie.videos?.key ? (
            <ReactPlayer
              url={`https://www.youtube.com/embed/${currentMovie.videos?.key}`}
              controls
              width={350}
              height={300}
              />
              ) : (
                <Slider {...settings} className='max-w-[350px] cursor-grab'>
              {currentMovie.images?.map((el) => (
                <div>
                  <img className='w-[350px]' src={el} alt='' />
                </div>
              ))}
            </Slider>
          )}
              </div>
              <div className='mt-[20px] flex justify-center mb-12'>
              <Slider {...settings2} className='max-w-[350px] cursor-grab'>
              {currentMovie.seasons?.map((el) => (
                <div onClickCapture={() => navToCurrentSeason(el.season_number)} className='pl-2 pr-2'>
                  <img className='w-[350px]' src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt='' />
                </div>
              ))}
            </Slider>
              </div>
              </div>
        </div>
   </div>
  )
}

export default CurrentMovie
