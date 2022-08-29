import { Routes, Route } from 'react-router-dom'
import { Lists } from '../lists'
import { ListView } from '../list'
import { Nav } from '../Nav'

export function Home() {
  return (
    <>
      <Nav />
      <Routes>
        <Route element={<Lists />} path="/" />
        <Route element={<ListView />} path="/:id" />
      </Routes>
    </>
  )
}
