import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = ({ user, handleLogOut }) => {
  const Style = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={Style} to="/">
        Home
      </Link>
      <Link style={Style} to="/blogs">
        Blogs
      </Link>
      {user ? (
        <>
          <em>{user.username} logged in</em>
          <button onClick={handleLogOut}>Logout</button>
          <Link style={Style} to="/create">
            create blog
          </Link>
        </>
      ) : (
        <Link style={Style} to="/login">
          login
        </Link>
      )}
    </div>
  )
}

export default MenuLink
