import { useLocation, useNavigate } from 'react-router-dom'
import { whichLang } from '../../constants/_language'
import { Select } from '../UI/Select'

const Main = ({ list, selectLanguage, nextPage, prevPage, page }) => {
  const navigate = useNavigate()

  const location = useLocation()
  const navToCurrentMovie = (title, type, id) => {
    navigate(`/${title}/${type}/${id}`)
  }

  return (
    <div className='p-4 max-[360px]:p-0 md:p-0'>
      <div className='flex items-baseline justify-between'>
        <h1 className="text-white text-2xl md:text-3xl font-['Inter'] mb-[20px]">
          {whichLang() ? 'В тренде' : 'Trending Now'}
        </h1>

        <div className='flex items-center gap-[50px]'>
          <div className='flex items-center gap-[5px] text-white'>
            <h1 className='text-[20px] cursor-pointer' onClick={prevPage}>
              ←
            </h1>
            <h1>{page}</h1>
            <h1 className='text-[20px] cursor-pointer' onClick={nextPage}>
              →
            </h1>
          </div>
          {location.pathname === '/' && (
            <Select variant='language' onChange={selectLanguage}>
              <option className='text-black' value='en' selected={whichLang()}>
                English
              </option>
              <option className='text-black' value='ru' selected={whichLang()}>
                Русский
              </option>
            </Select>
          )}
        </div>
      </div>

      <div className='flex flex-wrap gap-y-[20px] justify-between'>
        {list?.map((el) => (
          <div
            onClickCapture={() => navToCurrentMovie(el.title, el.type, el.id)}
          >
            <img
              className='w-[165px] md:w-[225px] cursor-pointer'
              src={el.poster}
              alt='none'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
