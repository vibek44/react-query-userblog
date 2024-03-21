import React, { useContext } from 'react'
import { useParams, useMatch } from 'react-router-dom'
import { useBlogHook } from '../hooks/index'
import { UserContext } from '../context'

const UserBlog = ({ handleLogOut }) => {
  const { resultuser } = useBlogHook()
  const [user] = useContext(UserContext)
  const match = useMatch('/user/:id')
  const userBlogList = match
    ? resultuser.data.find((user) => user.id === match.params.id)
    : null
  console.log(userBlogList)
  const handleSignOut = () => {
    handleLogOut()
    navigate('/')
  }

  return (
    <div>
      <h3>Blogs</h3>
      <p> {user.username} logged in </p>
      <button onClick={handleSignOut}>logout</button>
      <h2>{userBlogList.username}</h2>
      <h4>added blogs</h4>
      {userBlogList.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default UserBlog
