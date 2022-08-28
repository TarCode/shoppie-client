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
    <dialog open={props.addItemOpen}>
      <article>
        <header>
          <a onClick={() => props.setAddItemOpen(false)} aria-label="Close" className="close"></a>
          Add item
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Item name</label>
          <input {...register('name')} placeholder="Item name" />
          <button aria-busy={mutation.isLoading ? true : false} className="contrast">
            Add item
          </button>
        </form>
      </article>
    </dialog>
  )
}
