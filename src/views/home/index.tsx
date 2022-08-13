import { Routes, Route } from 'react-router-dom'
import { Lists } from '../lists'
import { List } from '../list'
import { Nav } from '../../components/nav'

export function Home() {
  return (
    <>
      <Nav />
      <Routes>
        <Route element={<Lists />} path="/" />
        <Route element={<List />} path="/:id" />
      </Routes>
    </>
  )
}
