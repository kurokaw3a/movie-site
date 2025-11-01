import { createSlice } from '@reduxjs/toolkit'
import {
  getFilmById,
  getFilmImages,
  getFilmVideos,
  getPopularFilms,
  getTvById,
  getTvSeasonById,
  searchTv,
} from './MyCinemaAction'

const initialState = {
  popularFilmsResult:[],
  popularFilmsStatus:null,
  searchStatus: null,
  searchResult: [],
  currentMovie: {},
  currentMovieStatus: null,
  currentSeasonStatus: null,
  currentSeason: {},
}
export const MyCinemaSlice = createSlice({
  name: 'MyCinema',
  initialState,
  reducers: {
    clear(state) {
      state.searchResult = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularFilms.pending, (state) => {
        state.popularFilmsStatus = 'pending'
      })
      .addCase(getPopularFilms.fulfilled, (state, action) => {
        state.popularFilmsStatus = 'success'
        state.popularFilmsResult = action.payload.result
      })
      .addCase(getPopularFilms.rejected, (state) => {
        state.popularFilmsStatus = 'error'
      })
      .addCase(searchTv.pending, (state) => {
        state.searchStatus = 'pending'
      })
      .addCase(searchTv.fulfilled, (state, action) => {
        if(action.payload.result.length < 1){
          state.searchStatus = "notfound"
        }else{
          state.searchStatus = 'success'
          state.searchResult = action.payload.result
        }
      })
      .addCase(searchTv.rejected, (state) => {
        state.searchStatus = 'error'
      })
      .addCase(getFilmById.pending, (state) => {
        state.currentMovieStatus = 'pending'
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.currentMovieStatus = 'success'
        state.currentMovie = action.payload.currentMovie
      })
      .addCase(getFilmById.rejected, (state) => {
        state.currentMovieStatus = 'error'
      })
      .addCase(getTvById.pending, (state) => {
        state.currentMovieStatus = 'pending'
      })
      .addCase(getTvById.fulfilled, (state, action) => {
        state.currentMovieStatus = 'success'
        state.currentMovie = action.payload.currentTv
      })
      .addCase(getTvById.rejected, (state) => {
        state.currentMovieStatus = 'error'
      })
      .addCase(getTvSeasonById.pending, (state) => {
        state.currentSeasonStatus = 'pending'
      })
      .addCase(getTvSeasonById.fulfilled, (state, action) => {
        state.currentSeasonStatus = 'success'
        state.currentSeason = action.payload.currentSeason
      })
      .addCase(getTvSeasonById.rejected, (state) => {
        state.currentSeasonStatus = 'error'
      })
      .addCase(getFilmVideos.fulfilled, (state, action) => {
        state.currentMovie = {
          videos: action.payload.movieVideo,
          ...state.currentMovie,
        }
      })
      .addCase(getFilmImages.fulfilled, (state, action) => {
        state.currentMovie = {
          images: action.payload.movieImages,
          ...state.currentMovie,
        }
      })
  },
})
