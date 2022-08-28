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
    <dialog open={props.addListOpen}>
      <article>
        <header>
          <a onClick={() => props.setAddListOpen(false)} aria-label="Close" className="close"></a>
          {action} list
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>List name</label>
          <input {...register('name')} placeholder="List name" />
          <button aria-busy={mutation.isLoading ? true : false} className="contrast">
            {action} list
          </button>
        </form>
      </article>
    </dialog>
  )
}
