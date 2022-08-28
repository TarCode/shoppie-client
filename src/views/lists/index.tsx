import { useState } from 'react'
import { useQuery } from 'react-query'
import { ListModal } from '../../modals/ListModal'
import { DeleteListModal } from '../../modals/DeleteListModal'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { ListItemButton } from '@mui/material'
import { listsGetApi } from '../../api'

export function Lists() {
  const navigate = useNavigate()
  const [listToDelete, setListToDelete] = useState()
  const [addListOpen, setAddListOpen] = useState(false)
  const [editList, setEditList] = useState(false)
  const getLists = () =>
    listsGetApi()
  const { data: lists, isLoading, refetch } = useQuery(['lists'], getLists, {
    select: (response) => {
      return response.data
    },
  })

  return isLoading ? <div>
    Loading lists...
  </div> : (
    <Container>
      <a style={{ float: 'right' }} onClick={() => setAddListOpen(true)} href="#" role="button" className="contrast">
        Add list
      </a>
      <h3>Lists</h3>
      {(addListOpen || editList) && (
        <ListModal 
          refetch={refetch} 
          addListOpen={addListOpen || !!editList} 
          setAddListOpen={editList ? setEditList : setAddListOpen} 
          list={editList} 
        />
      )}
      {!!listToDelete && (
        <DeleteListModal
          setDeleteListOpen={() => setListToDelete(undefined)}
          deleteListOpen={!!listToDelete}
          list={listToDelete}
          refetch={() => refetch()}
        />
      )}


      {lists && lists.length
        ? <List dense>
          {
            lists.map((list: any) => (
              <ListItem
                key={list.id}
                secondaryAction={
                  <IconButton onClick={() => setListToDelete(list)} edge="end" aria-label="delete">
                    <span className="material-icons md-36">delete</span>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <IconButton onClick={() => setEditList(list)} edge="end" aria-label="edit">
                    <span className="material-icons md-36">edit</span>
                  </IconButton>
                </ListItemAvatar>
                <ListItemButton onClick={() => navigate(list.id)}>
                  <ListItemText
                    primary={list.name}
                    secondary={list.createdAt}
                  />
                </ListItemButton>
              </ListItem>

            ))
          }
        </List>
        : (
          <div>
            No lists yet
          </div>
        )}
    </Container>
  )
}
