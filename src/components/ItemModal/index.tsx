import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

export function ItemModal(props: any) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, setValue } = useForm()

  const mutation = useMutation(
    (data) =>
      axios({
        method: 'post',
        url: 'https://murmuring-harbor-47924.herokuapp.com/items/',
        data,
        headers: {
          'x-access-token': props.token,
        },
      }),
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['list', props.listId])
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
