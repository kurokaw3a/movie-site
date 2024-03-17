import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiFetch } from '../../api/ApiFetch'

const url = 'https://image.tmdb.org/t/p/w500'


export const getPopularFilms = createAsyncThunk(
   'get/popularFilms',
   async(_,{rejectWithValue})=>{
  try{
     const response = await ApiFetch({
      url:`/movie/popular?language=${localStorage.getItem('#l34')}`
  })
  const result = []
  for (let i = 0; i < response.results?.length; i++) {
    if (response.results[i].poster_path && response.results[i].vote_average)
      result.push({
        type: 'movie',
        id: response.results[i].id,
        title: response.results[i].title,
        overview: response.results[i].overview,
        poster: url + response.results[i].poster_path,
        backdrop: url + response.results[i].backdrop_path,
        date: response.results[i].release_date,
        rating: response.results[i].vote_average,
      })
  }
    return {result}
  }
  catch(error){
   return rejectWithValue(error.message)
  }
  }
  )

export const searchFilm = createAsyncThunk(
  'get/film',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `/search/movie?query=${props.name}&language=${props.language}`,
      })
      const result = []
      for (let i = 0; i < response.results?.length; i++) {
        if (response.results[i].poster_path && response.results[i].vote_average)
          result.push({
            type: 'movie',
            id: response.results[i].id,
            title: response.results[i].title,
            overview: response.results[i].overview,
            poster: url + response.results[i].poster_path,
            backdrop: url + response.results[i].backdrop_path,
            date: response.results[i].release_date,
            rating: response.results[i].vote_average,
          })
      }
      dispatch(searchTv({ ...props, result }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const searchTv = createAsyncThunk(
  'get/tv',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `/search/tv?query=${props.name}&language=${props.language}`,
      })
      const result = []
      for(let i = 0; i < props.result?.length; i++){
       result.push({...props.result[i]})
      }
      for (let i = 0; i < response.results?.length; i++) {
        if (response.results[i].poster_path)
          result.push({
            type: 'tv',
            id: response.results[i].id,
            title: response.results[i].name,
            overview: response.results[i].overview,
            poster: url + response.results[i].poster_path,
            backdrop: url + response.results[i].backdrop_path,
            date: response.results[i].first_air_date,
            rating: response.results[i].vote_average,
          })
      }
      return { result }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getFilmById = createAsyncThunk(
  'get/filmById',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `/movie/${props.id}?language=${props.language}`,
      })
      dispatch(getFilmVideos({ ...props, type: 'movie' }))
      dispatch(getFilmImages({ ...props, type: 'movie' }))
      return { currentMovie: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getTvById = createAsyncThunk(
  'get/tvById',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `/tv/${props.id}?language=${props.language}`,
      })
      dispatch(getFilmVideos({ ...props, type: 'tv' }))
      dispatch(getFilmImages({ ...props, type: 'tv' }))
      return {
        currentTv: {
          title: response.name,
          release_date: response.first_air_date,
          ...response,
        },
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getTvSeasonById = createAsyncThunk(
  'get/tvSeasonById',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `/tv/${props.id}/season/${props.season}?language=${props.language}`,
      })
      return {
        currentSeason: {
          title: response.name,
          release_date: response.first_air_date,
          ...response,
        },
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getFilmVideos = createAsyncThunk(
  'get/filmVideos',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `/${props.type}/${props.id}/videos?language=${props.language}`,
      })
      const video = []
      for (let i = 0; i < response.results?.length; i++) {
        if (response.results[i].type === 'Trailer')
          video.push(response.results[i])
      }
      return { movieVideo: video }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getFilmImages = createAsyncThunk(
  'get/filmImages',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `/${props.type}/${props.id}/images`,
      })
      const images = []
      for (let i = 0; i < response.backdrops?.length; i++) {
        images.push(url + response.backdrops[i].file_path)
      }
      return { movieImages: images.reverse() }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
