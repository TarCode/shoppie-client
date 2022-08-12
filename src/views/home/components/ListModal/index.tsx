import { useForm } from 'react-hook-form'
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

  const onSubmit = (data: any) => {
    console.log('VALUES', data)
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
          <button className="contrast">Add list</button>
        </form>
      </article>
    </dialog>
  )
}
