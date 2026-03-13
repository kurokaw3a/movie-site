import Slider from 'react-slick'
import { settings2 } from '../../constants/_slider'
import { useNavigate } from 'react-router-dom'

export const MovieSeasonsList = ({ movie }) => {
  const navigate = useNavigate()
  const navToCurrentSeason = (season) => {
    navigate(`${season}`)
  }
  return (
    <div className='text-white md:ml-12 md:space-y-50px]'>
      <div className='max-h-[500px] overflow-y-auto hidden md:block'>
        {movie.seasons?.map(
          (el) =>
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
        )}
      </div>
      <div className='mt-[20px] md:hidden'>
        {movie.seasons && (
          <h1 className='text-xl text-zinc-200 mb-[10px]'>Seasons</h1>
        )}
        <div className='flex justify-center mb-12'>
          <Slider {...settings2} className='max-w-[350px] cursor-grab'>
            {movie.seasons?.map((el) => (
              <div
                onClickCapture={() => navToCurrentSeason(el.season_number)}
                className='pl-2 pr-2'
              >
                <img
                  className='w-[350px]'
                  src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                  alt=''
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
