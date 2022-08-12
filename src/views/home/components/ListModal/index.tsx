import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

export function ListModal(props: any) {
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
      onSuccess: (response) => {
        console.log('List added ', response)
        props.setAddListOpen(false)
      },
      onError: (errorRes: any) => {},
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
