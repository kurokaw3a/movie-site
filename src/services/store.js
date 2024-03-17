import { configureStore } from '@reduxjs/toolkit'
import { MyCinemaSlice } from './MyCinema/MyCinemaSlice'

export const store = configureStore({
  reducer: {
    cinema: MyCinemaSlice.reducer,
  },
})
