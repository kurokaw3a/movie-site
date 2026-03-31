export const MovieTrailers = ({ movie }) => {
  return (
    <div>
      {movie.videos?.length > 0 && (
        <h1 className='text-xl text-zinc-200 mb-[10px] mt-[10px]'>Trailers</h1>
      )}

      <div className='mt-[5px] flex justify-center md:block'>
        {movie.videos?.length > 0 && (
          <div className='max-w-[1100px] flex flex-wrap gap-10 overflow-auto'>
            {movie.videos?.map((el) => (
              <iframe
                title='trailer'
                frameborder='0'
                src={`https://www.youtube.com/embed/${el.key}`}
                className='w-[350px] h-[220px] md:w-[520px] md:h-[300px]'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
