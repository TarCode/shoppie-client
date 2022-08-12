import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Nav } from './components/nav'
import { ListModal } from './components/ListModal'

export function Home() {
  const [addListOpen, setAddListOpen] = useState(false)
  const stringifiedUser = localStorage.getItem('user') as string
  const user = JSON.parse(stringifiedUser)
  const getLists = axios('http://localhost:8080/lists/', {
    headers: {
      'x-access-token': user.token,
    },
  })
  const { data: lists } = useQuery(['lists'], () => getLists, {
    select: (response) => {
      return response.data
    },
  })
  console.log('DATA', lists)

  return (
    <div>
      <Nav />
      <a onClick={() => setAddListOpen(true)} href="#" role="button" className="contrast">
        Add list
      </a>
      <h2>Home</h2>
      <ListModal token={user.token} addListOpen={addListOpen} setAddListOpen={setAddListOpen} />
    </div>
  )
}
