import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteItemModal } from '../../components/DeleteItemModal'
import { ItemModal } from '../../components/ItemModal'

export function List() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState()

  const stringifiedUser = localStorage.getItem('user') as string
  const user = JSON.parse(stringifiedUser)

  const getList = () =>
    axios('https://murmuring-harbor-47924.herokuapp.com/lists/' + id, {
      headers: {
        'x-access-token': user.token,
      },
    })
  const { data: list, isLoading: isLoadingList } = useQuery(['list', id], getList, {
    select: (response) => {
      return response.data
    },
  })

  const getItems = () =>
    axios('https://murmuring-harbor-47924.herokuapp.com/items/list/' + id, {
      headers: {
        'x-access-token': user.token,
      },
    })
  const { data: items, isLoading, refetch } = useQuery(['list-items', id], getItems, {
    select: (response) => {
      return response.data
    },
  })

  return isLoading || isLoadingList ? 
  <div>
    Loading items...
  </div> : (
    <div>
      <div style={{ display: 'flex', float: 'right' }}>
        <button
          style={{ marginRight: '8px', width: '120px' }}
          onClick={() => navigate(-1)}
          className="outline contrast"
        >
          Back
        </button>
        <button style={{ width: '150px' }} onClick={() => setAddItemOpen(true)} className="contrast">
          Add item
        </button>
      </div>
      <h3>{list && list.name}</h3>
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

            {/* <div className="col">
              <button role="button" className="contrast outline action-btn">
                Edit
              </button>
            </div> */}
            <div className="col">
              <button onClick={() => setItemToDelete(item)} className="contrast outline action-btn">
                <span className="material-icons md-36">delete</span>
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
