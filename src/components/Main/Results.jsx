import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchFilm } from '../../services/MyCinema/MyCinemaAction'
import Loader from '../UI/loader/Loader'
import { useEffect } from 'react';
import { MyCinemaSlice } from '../../services/MyCinema/MyCinemaSlice';

const Results = () => {
    const { searchResult, searchStatus } = useSelector((state) => state.cinema)
    const { keyword } = useParams()
    const en = /[A-za-zA-Z]/
    const ru = /[А-яа-яА-Я]/
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(
            searchFilm({
              name: keyword,
              language:
                (en.test(keyword) && 'en') ||
                (ru.test(keyword) && 'ru'),
            })
          )
    }, [keyword])
    const location = useLocation()
    useEffect(()=>{
     dispatch(MyCinemaSlice.actions.clear())
    },[location.pathname, dispatch])
    const navigate = useNavigate()
    const navToCurrentMovie = (title, id, type) => {
      navigate(`/${title}/${id}`)
      sessionStorage.setItem('tp34', type)
    }
    return (
        <div>
            {searchStatus === 'pending' ? (
            <Loader />
            ) : (
              <div className='flex flex-wrap justify-center w-[100%] md:w-auto gap-[20px] md:max-h-[600px] md:overflow-y-auto mb-[60px] md:mb-0'>
              {searchResult?.map((el) => (
                <div
                onClickCapture={() => navToCurrentMovie(el.title, el.id, el.type)}
                >
                  <img className='w-[165px] md:w-[200px]' src={el.poster} alt='none' />
                  <h4 className='text-white text-[12px] md:text-[15px] font-medium max-w-[150px] md:w-[200px]'>
                    {el.title}
                  </h4>
                </div>
              ))}
            </div>
          )}
          {searchStatus === 'success' && searchResult?.length < 1 && <h1 className='text-white'>NOT FOUND</h1>}
        </div>
    );
};

export default Results;