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
