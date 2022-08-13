import { Routes, Route } from 'react-router-dom'
import { Lists } from '../lists'
import { List } from '../list'

export function Home() {
  return (
    <Routes>
      <Route element={<Lists />} path="/" />
      <Route element={<List />} path="/:id" />
    </Routes>
  )
}
