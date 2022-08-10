import { useState } from 'react'

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={() => {
      console.log('THE FORM VALUES', email, password)
    }}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />
      <button type="submit">Submit</button>
    </form>
  );
}