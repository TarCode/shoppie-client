import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

export function DeleteItemModal(props: any) {
  const { handleSubmit } = useForm()
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (id) =>
      axios({
        method: 'delete',
        url: 'https://murmuring-harbor-47924.herokuapp.com/items/' + id,
        headers: {
          'x-access-token': props.token,
        },
      }),
    {
      onSettled: async () => {
        await queryClient.invalidateQueries()
        props.setDeleteItemOpen(null)
      },
    },
  )

  const onSubmit = (data: any) => {
    mutation.mutate(props.item.id)
  }
  return (
    <dialog open={props.deleteItemOpen}>
      <article>
        <header>
          <a onClick={() => props.setDeleteItemOpen(null)} aria-label="Close" className="close"></a>
          Are you sure you want to delete this item?
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>{props.item && props.item.name}</label>
          <button aria-busy={mutation.isLoading ? true : false} className="contrast">
            Delete item
          </button>
        </form>
      </article>
    </dialog>
  )
}
