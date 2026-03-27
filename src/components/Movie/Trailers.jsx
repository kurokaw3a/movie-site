export const MovieTrailers = ({ movie }) => {
  return (
    <div>
      {movie.videos?.length > 0 && (
        <h1 className='text-xl text-zinc-200 mb-[10px] mt-[10px]'>Trailers</h1>
      )}

      <div className='mt-[5px] flex justify-center md:block'>
        {movie.videos?.length > 1 && (
          // <Slider {...settings3} className='w-[350px] max-w-[350px] md:w-max md:max-w-[600px] cursor-grab'>
          <div className='max-w-[1100px] flex items-center gap-[20px] overflow-auto'>
            {movie.videos?.map((el) => (
              <iframe
                title='trailer'
                frameborder='0'
                src={`https://www.youtube.com/embed/${el.key}`}
                className='w-[350px] h-[220px] md:w-[600px] md:h-[300px]'
              />
            ))}
          </div>
          // </Slider>
        )}
        {movie.videos?.length === 1 && (
          <iframe
            title='trailer'
            frameborder='0'
            src={'https://www.youtube.com/embed/' + movie.videos[0]?.key}
            className='w-[350px] h-[220px] md:w-[600px] md:h-[300px]'
          />
        )}

        {/* <div>
          {movie.images?.map((el) => (
            <div>
              <img className='' src={el} alt='' />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )
}
