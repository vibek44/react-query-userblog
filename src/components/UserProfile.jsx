import React, { useContext } from 'react'
import { UserContext } from '../context'

const UserProfile = ({ handleLogOut }) => {
  const [user] = useContext(UserContext)
  if (user)
    return (
      <>
        <p> {user.username} logged inn </p>
        <button onClick={handleLogOut}>logout</button>
      </>
    )
}

export default UserProfile
