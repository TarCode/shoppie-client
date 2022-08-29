import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { listDeleteApi } from '../../api'

export function DeleteListModal(props: any) {
  const { handleSubmit } = useForm()
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (id: string) => listDeleteApi(id),
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['lists'])
        props.setDeleteListOpen(null)
      },
    },
  )

  const onSubmit = () => {
    mutation.mutate(props.list.id)
  }
  return (
    <Dialog open={props.deleteListOpen} onClose={() => props.setDeleteListOpen(null)}>
      <article>
        <DialogTitle>
          Are you sure you want to delete this list?
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>{props.list && props.list.name}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.setDeleteListOpen(null)}>
              Cancel
            </Button>
            <Button variant="contained" disabled={mutation.isLoading ? true : false} type="submit">
              Delete list
            </Button>
          </DialogActions>
        </form>
      </article>
    </Dialog>
  )
}
