import { Route, Routes } from 'react-router-dom'
import CurrentMovie from '../components/CurrentMovie/CurrentMovie'
import CurrentSeason from '../components/CurrentMovie/CurrentSeason'
import Main from '../components/Main/Main'
import Layout from '../layouts/Layout'
import Results from '../components/Main/Results'

export const Root = () => {
  return (
    <Routes>
      <Route path='' element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='/:keyword' element={<Results />} />
        <Route path='/:title/:id' element={<CurrentMovie />} />
        <Route path='/:title/:id/:season' element={<CurrentSeason />} />
      </Route>
    </Routes>
  )
}
