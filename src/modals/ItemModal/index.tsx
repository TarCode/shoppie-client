import { Dialog, DialogTitle, Button, TextField, DialogActions, DialogContent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { itemPostApi } from '../../api'

export function ItemModal(props: any) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, setValue } = useForm()

  const mutation = useMutation(
    (data) => itemPostApi(data),
    {
      onSettled: async () => {
        await queryClient.invalidateQueries()
        setValue('name', '')
        props.setAddItemOpen(false)
      },
    },
  )

  const onSubmit = (data: any) => {
    mutation.mutate({
      ...data,
      listId: props.listId,
    })
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={props.addItemOpen} onClose={() => props.setAddItemOpen(false)}>
      <DialogTitle>
        Add item
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField fullWidth {...register('name')} placeholder="Item name" label="Item name" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setAddItemOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isLoading ? true : false} variant="contained">
            Add item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
