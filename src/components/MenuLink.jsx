import React, { useContext } from 'react'
import { UserContext } from '../context'
import { Link, useNavigate } from 'react-router-dom'

const MenuLink = ({ handleLogOut }) => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const handleSignOut = () => {
    handleLogOut()
    navigate('/')
  }
  const Style = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={Style} to='/'>
        Blogs
      </Link>

      <Link style={Style} to='/users'>
        users
      </Link>

      {user ? (
        <>
          {user.username} signed in
          <button onClick={handleSignOut}>Logout</button>
        </>
      ) : (
        <Link style={Style} to='/login'>
          login
        </Link>
      )}
    </div>
  )
}

export default MenuLink
