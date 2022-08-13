import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

export function DeleteListModal(props: any) {
  const { handleSubmit } = useForm()
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (id) =>
      axios({
        method: 'delete',
        url: 'http://localhost:8080/lists/' + id,
        headers: {
          'x-access-token': props.token,
        },
      }),
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['lists'])
        props.setDeleteListOpen(null)
      },
    },
  )

  const onSubmit = (data: any) => {
    mutation.mutate(props.list.id)
  }
  return (
    <dialog open={props.deleteListOpen}>
      <article>
        <header>
          <a onClick={() => props.setDeleteListOpen(null)} aria-label="Close" className="close"></a>
          Are you sure you want to delete this list?
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>{props.list && props.list.name}</label>
          <button aria-busy={mutation.isLoading ? true : false} className="contrast">
            Delete list
          </button>
        </form>
      </article>
    </dialog>
  )
}
