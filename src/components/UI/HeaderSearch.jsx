import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MyCinemaSlice } from "../../services/MyCinema/MyCinemaSlice";
import { useDispatch } from "react-redux";
import { getPopularFilms } from "../../services/MyCinema/MyCinemaAction";

const HeaderSearch = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const searchFilm = (event) => {
     event.preventDefault()
     dispatch(MyCinemaSlice.actions.clear())
     if(event.target[0]?.value?.trim()?.length >= 2){
      navigate(`/${event.target[0]?.value}`) 
    }
    }
    const {keyword} = useParams()
    const selectLanguage = (e)=>{
     localStorage.setItem('#l34', e.target.value)
     dispatch(getPopularFilms())
    }
    return (
        <header className='flex items-center justify-center h-[80px] md:gap-[5px] bg-gradient-to-b from-zinc-950 to-neutral-900'>
        <form onSubmit={searchFilm}>
        <input
          className='md:w-[500px] h-12 text-3xl bg-transparent border-b-2 outline-none text-white'
          type='text'
          placeholder={keyword || 'search'}
          />
        </form>
        {location.pathname === '/' && 
        <select className="absolute right-0 mb-[55px] md:mb-0 md:mr-[50px] outline-none bg-transparent text-white cursor-pointer" onChange={selectLanguage}>
          <option className="text-black" value="en" selected={localStorage.getItem('#l34') === 'en'}>English</option>
          <option className="text-black" value="ru" selected={localStorage.getItem('#l34') === 'ru'}>Русский</option>
        </select>
        }
      </header>
    );
};

export default HeaderSearch;