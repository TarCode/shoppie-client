import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ListModal } from '../../modals/ListModal'
import { DeleteListModal } from '../../modals/DeleteListModal'
import { useNavigate } from 'react-router-dom'

export function Lists() {
  const navigate = useNavigate()
  const [listToDelete, setListToDelete] = useState()
  const [addListOpen, setAddListOpen] = useState(false)
  const [editList, setEditList] = useState(false)
  const stringifiedUser = localStorage.getItem('user') as string
  const user = JSON.parse(stringifiedUser)
  const getLists = () =>
    axios('https://murmuring-harbor-47924.herokuapp.com/lists/', {
      headers: {
        'x-access-token': user.token,
      },
    })
  const { data: lists, isLoading, refetch } = useQuery(['lists'], getLists, {
    select: (response) => {
      return response.data
    },
  })

  return isLoading ? <div>
    Loading lists...
  </div> : (
    <div>
      <a style={{ float: 'right' }} onClick={() => setAddListOpen(true)} href="#" role="button" className="contrast">
        Add list
      </a>
      <h3>Lists</h3>
      {(addListOpen || editList) && (
        <ListModal refetch={refetch} token={user.token} addListOpen={addListOpen || !!editList} setAddListOpen={editList ? setEditList : setAddListOpen} list={editList} />
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
      {lists && lists.length
        ? lists.map((list: any) => (
            <div key={list.id} style={{ display: 'flex' }}>
              <button onClick={() => navigate(list.id)} className="contrast outline list-btn">
                <b>{list.name}</b>
              </button>

              <div className="col">
                <button onClick={() => setEditList(list)} role="button" className="contrast outline action-btn">
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
        : (
          <div>
            No lists yet
          </div>
        )}
    </div>
  )
}
