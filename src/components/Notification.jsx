import React, { useContext } from 'react'
import { NotificationContext } from '../context'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (!notification) return null

  return <Alert variant='success'>{notification}</Alert>
}

export default Notification
