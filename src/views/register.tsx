import { useState } from 'react'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <form
      onSubmit={() => {
        console.log('THE FORM VALUES', email, password)
      }}
    >
      <h2>Register</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <input
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        placeholder="Confirm password"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
