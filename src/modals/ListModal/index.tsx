import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { listPostApi, listPutApi } from '../../api'

export function ListModal(props: any) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: props.list ? props.list.name : 'List-' + new Date().toString().split(' ').slice(0, 5).join('-').replaceAll(':', '-')
    },
  })

  const mutation = useMutation(
    (data) => {
      if (props.list) {
        return listPutApi(props.list.id, data)
      }
      return listPostApi(data)
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries()
        setValue('name', '')
        props.setAddListOpen(false)
      },
    },
  )

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }
  const action = props.id ? 'Edit' : 'Add'

  return (
    <Dialog maxWidth="sm" fullWidth open={props.addListOpen} onClose={() => props.setAddListOpen(false)}>
      <DialogTitle>{action} list</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField {...register('name')} fullWidth placeholder="List name" label="List name" />

        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => props.setAddListOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" disabled={mutation.isLoading ? true : false} type="submit">
            {action} list
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
