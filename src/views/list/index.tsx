import { useParams } from 'react-router-dom'

export function List() {
  const { id } = useParams()
  return (
    <div>
      <h2>I am the list</h2>
      <p>{id}</p>
    </div>
  )
}
