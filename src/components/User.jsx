import React, { useContext } from 'react'
import UserProfile from './UserProfile'
import { UserContext } from '../context'
import { Link, useNavigate } from 'react-router-dom'
import { useBlogHook } from '../hooks'

const Users = ({ handleLogOut }) => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const { resultuser } = useBlogHook()

  const handleSignOut = () => {
    handleLogOut()
    navigate('/')
  }

  if (user)
    return (
      <div>
        <h3>Blogs</h3>
        <UserProfile handleLogOut={handleLogOut} />
        <h2>
          <em>Users</em>
        </h2>
        <table>
          <tbody>
            <tr>
              <td>username</td>
              <td>blogsCreated</td>
            </tr>
            {resultuser.data.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/user/${user.id}`}>{user.username}</Link>
                </td>

                <td> {user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  return (
    <div>
      <h2>Welcome to Bloglist App</h2>
      <p>
        login to
        <Link to='/login'>
          {' '}
          <em> continue</em>
        </Link>
      </p>
    </div>
  )
}

export default Users
