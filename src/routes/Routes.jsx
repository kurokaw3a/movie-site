import { Route, Routes } from 'react-router-dom'
import Main from '../components/Main/Main'
import Layout from '../layouts/Layout'
import Results from '../components/Main/Results'
import { MoviePage } from '../pages/Movie'
import { SeasonPage } from '../pages/Season'

export const Root = () => {
  return (
    <Routes>
      <Route path='' element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='/:keyword' element={<Results />} />
        <Route path='/:title/:type/:id' element={<MoviePage />} />
        <Route path='/:title/:type/:id/:season' element={<SeasonPage />} />
      </Route>
    </Routes>
  )
}
