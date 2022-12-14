import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/joy/Card'
import { useCallback, useState } from 'react'
import { loginApi } from '../api'

export function Login() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState(undefined), []);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const mutation = useMutation(
    (data) =>
      loginApi(data),
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
        forceUpdate()
      },
    },
  )

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }
  return (
    <form style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }} onClick={() => clearErrors()} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ width: '320px' }}>
        <h2>Login</h2>
        <TextField
          label='Email'
          error={!!errors.email}
          {...register('email')}
          placeholder="Email"
        />
        <br />
        <label htmlFor="password">

        </label>
        <TextField
          label='Password'
          error={!!errors.password}
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.form && <span className="error"><br />{errors.form.message as unknown as string}</span>}
        <br />
        <Button aria-busy={mutation.isLoading ? true : undefined} disabled={mutation.isLoading} type="submit">
          {
            mutation.isLoading ?
              "Logging in..." :
              "Login"
          }
        </Button>
        <br />
        <Link to="/register" role="button" className='outline'>
          Need an an account?
        </Link>
      </Card>
    </form>
  )
}
