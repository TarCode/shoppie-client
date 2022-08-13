import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { DeleteItemModal } from '../../components/DeleteItemModal'
import { ItemModal } from '../../components/ItemModal'

export function List() {
  const { id } = useParams()
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState()

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

  return (
    <div>
      <a style={{ float: 'right' }} onClick={() => setAddItemOpen(true)} href="#" role="button" className="contrast">
        Add item
      </a>
      <h3>List</h3>
      {addItemOpen && (
        <ItemModal listId={id} token={user.token} addItemOpen={addItemOpen} setAddItemOpen={setAddItemOpen} />
      )}
      {!!itemToDelete && (
        <DeleteItemModal
          token={user.token}
          setDeleteItemOpen={() => setItemToDelete(undefined)}
          deleteItemOpen={!!itemToDelete}
          item={itemToDelete}
          refetch={() => refetch()}
        />
      )}
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
