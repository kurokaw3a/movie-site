export const MovieInfo = ({ movie, lang }) => {
  return (
    <div>
      <div className='md:flex md:gap-12 items-start font-["Inter"]'>
        <div className='flex justify-center'>
          <img
            className='md:hidden absolute h-[350px] brightness-[0.3] blur-[3px] top-0 bg-gradient-to-b from-zinc-950 to-neutral-900'
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt='error'
          />
          <img
            className='max-w-[350px] h-[350px] rounded md:max-w-96 md:h-auto md:inital md:z-[-1] relative z-1'
            src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
            alt='none'
          />
        </div>

        <div className='md:h-[576px] text-white md:flex md:flex-col md:justify-between mt-2 md:mt-0'>
          <div className='space-y-0.5 md:space-y-2'>
            <div>
              <h1 className='md:text-4xl md:max-w-[800px] text-[20px]'>
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className='text-cyan-200 text-[15px] md:text-lg md:max-w-[800px]'>
                  {movie.tagline}
                </p>
              )}
            </div>
            <p className='text-white md:max-w-2xl text-sm md:text-xl'>
              {movie.overview}
            </p>
            <div>
              {movie.runtime ? (
                <p className='text-white text-sm md:text-xl'>
                  {Math.floor(movie.runtime / 60) !== 0 &&
                    `${Math.floor(movie.runtime / 60)}${lang ? 'h' : 'ч'}`}{' '}
                  {movie.runtime % 60}
                  {lang ? 'm' : 'м'}
                </p>
              ) : (
                <p className='text-white text-sm md:text-xl'>
                  {movie.number_of_seasons}
                  {lang
                    ? 'season'
                    : movie.number_of_seasons === 1
                    ? 'сезон '
                    : movie.number_of_seasons > 1 &&
                      movie.number_of_seasons <= 4
                    ? 'сезона '
                    : 'сезонов'}
                  / {movie.number_of_episodes}
                  {lang
                    ? 'episodes'
                    : movie.number_of_episodes === 1
                    ? 'серия'
                    : movie.number_of_seasons > 1 && movie.number_of_seasons < 5
                    ? 'серии'
                    : 'серий'}
                </p>
              )}
            </div>
            <div className='flex justify-between md:items-baseline md:max-w-[600px] text-white md:text-3xl'>
              <div>
                <div className='flex gap-1 text-white text-lg md:text-3xl'>
                  <h1>{movie.release_date?.slice(0, 4)}</h1>
                  <h1>/</h1>
                  <h1>{movie?.production_countries?.[0]?.iso_3166_1}</h1>
                </div>
                <div className='flex gap-2 text-white flex-wrap'>
                  {movie?.genres?.map((el) => (
                    <h5 className='text-[12px] md:text-lg'>{el.name}</h5>
                  ))}
                </div>
              </div>
              <div>
                <h1
                  className={
                    (movie.vote_average?.toFixed(1) < 4 &&
                      'text-red-400 text-xl') ||
                    (movie.vote_average?.toFixed(1) > 7 &&
                      'text-green-500 text-xl font-semibold') ||
                    'text-yellow-400 text-xl'
                  }
                >
                  {movie.vote_average?.toFixed(1)}
                </h1>
                <p className='text-sm'>
                  {movie.vote_count} {lang ? 'votes' : 'голосов'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
