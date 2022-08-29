import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { itemDeleteApi } from '../../api'

export function DeleteItemModal(props: any) {
  const { handleSubmit } = useForm()
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (id: string) => itemDeleteApi(id),
    {
      onSettled: async () => {
        await queryClient.invalidateQueries()
        props.setDeleteItemOpen(null)
      },
    },
  )

  const onSubmit = () => {
    mutation.mutate(props.item.id)
  }
  return (
    <Dialog open={props.deleteItemOpen} onClose={() => props.setDeleteItemOpen(null)}>
      <article>
        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>{props.item && props.item.name}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.setDeleteItemOpen(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={mutation.isLoading ? true : false}>
              Delete item
            </Button>
          </DialogActions>
        </form>
      </article>
    </Dialog >
  )
}
