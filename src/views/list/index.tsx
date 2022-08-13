import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export function List() {
  const { id } = useParams()

  const stringifiedUser = localStorage.getItem('user') as string
  const user = JSON.parse(stringifiedUser)
  const getList = () =>
    axios('http://localhost:8080/items/list/' + id, {
      headers: {
        'x-access-token': user.token,
      },
    })
  const { data: items, refetch } = useQuery(['list', id], getList, {
    select: (response) => {
      return response.data
    },
  })

  const setItemToDelete = (item: any) => {}

  console.log('LIST ITEMS', items)

  return (
    <div>
      <h2>List</h2>
      {items && !!items.length ? (
        items.map((item: any) => (
          <div key={item.id} style={{ display: 'flex' }}>
            <button className="contrast outline item-btn">
              <b>{item.name}</b>
            </button>

            <div className="col">
              <button role="button" className="contrast outline action-btn">
                Edit
              </button>
            </div>
            <div className="col">
              <button onClick={() => setItemToDelete(item)} role="button" className="contrast outline action-btn">
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No items added to list</p>
        </div>
      )}
    </div>
  )
}
