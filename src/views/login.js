import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const mutation = useMutation((data) =>
    fetch('https://murmuring-harbor-47924.herokuapp.com/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    }).then(res => {
      return res.json()
    }

    ), {
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries(['todos'])
      console.log('DATA ON SUCCESS', data);
    },
    onError: (error) => {
      console.log('ERROR', error);
    }
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      console.log('THE FORM VALUES', email, password)
      mutation.mutate({
        email,
        password
      })
    }}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />
      <button type="submit">Submit</button>
    </form>
  );
}