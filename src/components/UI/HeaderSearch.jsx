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
    return (
        <header className='flex items-center justify-center h-[80px] md:gap-[5px] bg-gradient-to-b from-zinc-950 to-neutral-900'>
        <form onSubmit={searchFilm}>
        <input
          className='w-[95%] md:w-[500px] h-12 text-3xl bg-transparent border-b-2 outline-none text-white'
          type='text'
          placeholder={keyword || 'search'}
          />
        </form>
      </header>
    );
};

export default HeaderSearch;