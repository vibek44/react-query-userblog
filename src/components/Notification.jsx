import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) return null

  return <p>{notification}</p>
}

export default Notification
