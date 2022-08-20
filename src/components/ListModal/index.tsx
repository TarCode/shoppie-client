import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

export function ListModal(props: any) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { name: 'List-' + new Date().toString().split(' ').slice(0, 5).join('-').replaceAll(':', '-') },
  })

  const mutation = useMutation(
    (data) =>
      axios({
        method: 'post',
        url: 'https://murmuring-harbor-47924.herokuapp.com/lists/',
        data,
        headers: {
          'x-access-token': props.token,
        },
      }),
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
  return (
    <dialog open={props.addListOpen}>
      <article>
        <header>
          <a onClick={() => props.setAddListOpen(false)} aria-label="Close" className="close"></a>
          Add list
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>List name</label>
          <input {...register('name')} placeholder="List name" />
          <button aria-busy={mutation.isLoading ? true : false} className="contrast">
            Add list
          </button>
        </form>
      </article>
    </dialog>
  )
}
