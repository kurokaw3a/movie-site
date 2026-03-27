import { Route, Routes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { MoviePage } from '../pages/Movie'
import { SeasonPage } from '../pages/Season'
import { MainPage } from '../pages/Main'
import { ResultsPage } from '../pages/Results'

export const Root = () => {
  return (
    <Routes>
      <Route path='' element={<Layout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/:keyword' element={<ResultsPage />} />
        <Route path='/:title/:type/:id' element={<MoviePage />} />
        <Route path='/:title/:type/:id/:season' element={<SeasonPage />} />
      </Route>
    </Routes>
  )
}
