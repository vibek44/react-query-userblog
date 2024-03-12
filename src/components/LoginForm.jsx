import React from 'react'
import { useField } from '../hooks/index'

const LoginForm = ({ handleLogin }) => {
  const userName = useField('text')
  const passWord = useField('password')

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div>
          username
          <input {...userName} />
        </div>
        <div>
          password
          <input {...passWord} />
        </div>
        <button name="submitbutton" type="submit">
          login
        </button>
      </fieldset>
    </form>
  )
}

export default LoginForm
