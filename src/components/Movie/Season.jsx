import Slider from 'react-slick'
import { settingsSeason } from '../../constants/_slider'

export const MovieSeason = ({ season, lang }) => {
  return (
    <div>
      <div className='flex gap-4 md:gap-12 items-start font-["Inter"]'>
        <div className='max-w-96 flex-col'>
          <img
            className='max-w-[150px] md:max-w-96'
            src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
            alt='none'
          />
        </div>
        <div className='text-white flex flex-col gap-y-[30px]'>
          <div className='space-y-2'>
            <h1 className='text-xl md:text-4xl md:max-w-[800px]'>
              {season.title}
            </h1>
            <p className='text-white md:max-w-2xl text-sm md:text-xl'>
              {season.overview}
            </p>
          </div>
          <div className='hidden md:block'>
            <Slider {...settingsSeason} className='max-w-[500px] cursor-grab'>
              {season.episodes?.map((el, i) => (
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
                (season.vote_average?.toFixed(1) < 4 &&
                  'text-red-400 text-4xl') ||
                (season.vote_average?.toFixed(1) > 7 &&
                  'text-green-500 text-4xl font-semibold') ||
                'text-yellow-400 text-4xl'
              }
            >
              {season.vote_average?.toFixed(1)}
            </h1>
            <p className='text-xl'>
              {season.vote_count} {lang ? 'votes' : 'голосов'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-[20px] md:hidden'>
        <div className='flex flex-col items-start gap-2 text-white'>
          <h1 className=' text-xl font-bold'>Episodes:</h1>
          <div>
            <Slider {...settingsSeason} className='max-w-[320px] cursor-grab'>
              {season.episodes?.map((el, i) => (
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