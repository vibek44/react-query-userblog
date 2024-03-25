import React, { useContext } from 'react'
import { useField } from '../hooks/index'
import { NotificationContext } from '../context'
import { Form, Button } from 'react-bootstrap'

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

  const Style = { width: 200 }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control style={Style} {...userName} />
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control style={Style} {...passWord} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
