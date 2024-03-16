import React, { useContext } from 'react'
import { NotificationContext } from '../context'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (!notification) return null

  return <p>{notification}</p>
}

export default Notification
