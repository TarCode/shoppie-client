import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

export function ListModal(props: any) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { 
      name: props.list ? props.list.name : 'List-' + new Date().toString().split(' ').slice(0, 5).join('-').replaceAll(':', '-') 
    },
  })

  const mutation = useMutation(
    (data) => {

      let url =  'https://murmuring-harbor-47924.herokuapp.com/lists/'
      let method = 'post'

      if (props.list) {
        url =  'https://murmuring-harbor-47924.herokuapp.com/lists/' + props.list.id
        method = 'put'
      }

      return axios({
        method,
        url,
        data,
        headers: {
          'x-access-token': props.token,
        },
      })
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
