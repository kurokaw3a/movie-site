import { useNavigate } from 'react-router-dom'
import { MyCinemaSlice } from '../../services/MyCinema/MyCinemaSlice'
import { useDispatch } from 'react-redux'
import { whichLang } from '../../constants/_language'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchFilm = (event) => {
    event.preventDefault()
    dispatch(MyCinemaSlice.actions.clear())
    if (event.target[0]?.value?.trim()?.length >= 2) {
      navigate(`/${event.target[0]?.value}`)
    }
  }

  return (
    <header className='w-full flex items-center justify-center pr-10 pl-10 h-[80px] md:gap-[5px] bg-gradient-to-b from-zinc-950 to-[rgb(26,26,26)] font-["Inter"]'>
      <div>
        <nav>
          <form onSubmit={searchFilm}>
            <input
              className='w-[300px] md:w-[500px] h-8 text-xl pl-3 bg-[#303030] rounded outline-none text-white'
              type='text'
              placeholder={whichLang() ? 'поиск' : 'search'}
            />
          </form>
        </nav>
      </div>
    </header>
  )
}

export default Header
