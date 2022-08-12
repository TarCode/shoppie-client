import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function ListModal(props: any) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { name: 'List-' + new Date().toString().split(' ').slice(0, 5).join('-').replaceAll(':', '-') },
  })

  const mutation = useMutation(
    (data) =>
      axios({
        method: 'post',
        url: 'http://localhost:8080/lists/',
        data,
        headers: {
          'x-access-token': props.token,
        },
      }),
    {
      onMutate: async (newList) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['lists'])

        // Snapshot the previous value
        const previousLists = queryClient.getQueryData(['lists'])

        // Optimistically update to the new value
        queryClient.setQueryData(['lists'], (old: any) => [...old, newList])

        // Return a context object with the snapshotted value
        return { previousLists }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newList, context: any) => {
        queryClient.setQueryData(['lists'], context.previousLists)
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(['lists'])
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
          <a onClick={() => props.setAddListOpen(false)} href="#close" aria-label="Close" className="close"></a>
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
