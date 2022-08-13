import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ListModal } from '../../components/ListModal'
import { DeleteListModal } from '../../components/DeleteListModal'
import { useNavigate } from 'react-router-dom'

export function Lists() {
  const navigate = useNavigate()
  const [listToDelete, setListToDelete] = useState()
  const [addListOpen, setAddListOpen] = useState(false)
  const stringifiedUser = localStorage.getItem('user') as string
  const user = JSON.parse(stringifiedUser)
  const getLists = () =>
    axios('http://localhost:8080/lists/', {
      headers: {
        'x-access-token': user.token,
      },
    })
  const { data: lists, refetch } = useQuery(['lists'], getLists, {
    select: (response) => {
      return response.data
    },
  })

  return (
    <div>
      <a style={{ float: 'right' }} onClick={() => setAddListOpen(true)} href="#" role="button" className="contrast">
        Add list
      </a>
      <h3>Lists</h3>
      {addListOpen && (
        <ListModal refetch={refetch} token={user.token} addListOpen={addListOpen} setAddListOpen={setAddListOpen} />
      )}
      {!!listToDelete && (
        <DeleteListModal
          token={user.token}
          setDeleteListOpen={() => setListToDelete(undefined)}
          deleteListOpen={!!listToDelete}
          list={listToDelete}
          refetch={() => refetch()}
        />
      )}
      {lists
        ? lists.map((list: any) => (
            <div key={list.id} style={{ display: 'flex' }}>
              <button onClick={() => navigate(list.id)} className="contrast outline list-btn">
                <b>{list.name}</b>
              </button>

              <div className="col">
                <button role="button" className="contrast outline action-btn">
                  <span className="material-icons md-36">edit</span>
                </button>
              </div>
              <div className="col">
                <button onClick={() => setListToDelete(list)} role="button" className="contrast outline action-btn">
                  <span className="material-icons md-36">delete</span>
                </button>
              </div>
            </div>
          ))
        : []}
    </div>
  )
}
