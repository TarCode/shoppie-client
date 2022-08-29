import { Button, Container, IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { itemsGetApi, listGetApi } from '../../api'
import { DeleteItemModal } from '../../modals/DeleteItemModal'
import { ItemModal } from '../../modals/ItemModal'

export function ListView() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState()

  const stringifiedUser = localStorage.getItem('user') as string
  const user = JSON.parse(stringifiedUser)

  const getList = () => listGetApi(id)
  const { data: list, isLoading: isLoadingList } = useQuery(['list', id], getList, {
    select: (response) => {
      return response.data
    },
  })

  const getItems = () => itemsGetApi(id)
  const { data: items, isLoading, refetch } = useQuery(['list-items', id], getItems, {
    select: (response) => {
      return response.data
    },
  })

  return isLoading || isLoadingList ?
    <div>
      Loading items...
    </div> : (
      <Container>
        <Button style={{ float: 'right' }} variant='contained' onClick={() => setAddItemOpen(true)}>
          Add item
        </Button>
        <Button
          style={{ marginRight: '8px', float: 'right' }}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Back
        </Button>

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
        {items && !!items.length ?
          <List dense>
            {
              items.map((item: any) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton onClick={() => setItemToDelete(item)} edge="end" aria-label="delete">
                      <span className="material-icons md-36">delete</span>
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={item.createdAt}
                  />
                </ListItem>

              ))
            }
          </List> : (
            <div>
              <p>No items added to list</p>
            </div>
          )}
      </Container>
    )
}
