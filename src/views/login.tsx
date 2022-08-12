import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export function Login() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const mutation = useMutation(
    (data) =>
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/login',
        data,
      }),
    {
      onSuccess: (response) => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
          window.location.assign('/')
        } else {
          setError('form', { message: 'Something went wrong', type: 'form' })
        }
      },
      onError: (errorRes: any) => {
        const { missingFields, error } = errorRes.response.data
        if (error) {
          setError('form', { message: error, type: 'form' })
        }
        if (missingFields) {
          const { email, password } = missingFields
          if (email) {
            setError('email', { message: email })
          }
          if (password) {
            setError('password', { message: password })
          }
        }
      },
    },
  )

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }
  return (
    <form onClick={() => clearErrors()} onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <label htmlFor="email">Email {errors.email && <span className="error">(This field is required)</span>}</label>
      <input aria-invalid={errors.email ? true : undefined} {...register('email')} type="email" placeholder="Email" />
      <label htmlFor="password">
        Password {errors.password && <span className="error">(This field is required)</span>}
      </label>
      <input
        aria-invalid={errors.password ? true : undefined}
        {...register('password')}
        type="password"
        placeholder="Password"
      />
      {errors.form && <span className="error">{errors.form.message as unknown as string}</span>}
      <button aria-busy={mutation.isLoading ? true : undefined} disabled={mutation.isLoading} type="submit">
        Submit
      </button>
    </form>
  )
}
