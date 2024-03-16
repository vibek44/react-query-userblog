import React, { useContext } from 'react'
import { useField } from '../hooks/index'
import { NotificationContext } from '../context'

const LoginForm = ({ handleLogin }) => {
  const [, notificationDispatch] = useContext(NotificationContext)
  const userName = useField('text')
  const passWord = useField('password')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(userName.value && passWord.value)) {
      notificationDispatch({
        type: 'setNotification',
        payload: 'username or password missing',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'setNotification', payload: '' })
      }, 3000)
      //handleLogin()
    }
    if (userName.value && passWord.value) {
      handleLogin({ username: userName.value, password: passWord.value })
    }
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
