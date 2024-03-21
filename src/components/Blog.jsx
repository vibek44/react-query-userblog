import React, { useContext } from 'react'
import { UserContext } from '../context'
import { useBlogHook } from '../hooks'
import { useField } from '../hooks/index'
import { useMatch, useNavigate } from 'react-router-dom'

const Blog = ({ handleLike, handleLogOut, handleComment }) => {
  const navigate = useNavigate()
  let formInput = useField('text')
  const [user] = useContext(UserContext)
  const { resultblog } = useBlogHook()
  const match = useMatch('/blog/:id')
  const blog = match
    ? resultblog.data.find((blog) => blog.id === match.params.id)
    : null

  const handleLikes = (blog) => {
    handleLike(blog)
  }

  const addComment = (e) => {
    e.preventDefault()
    if (!formInput.value) return
    handleComment(blog.id, formInput.value)
    formInput.onSubmit()
  }

  return (
    <div>
      <h3>Blogs</h3>
      <p> {user.username} logged in </p>
      <button onClick={handleLogOut}>logout</button>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => handleLikes(blog)}>like</button>
      </p>
      <p>
        added by <b>{blog.user.username}</b>
      </p>
      <h3>Comments</h3>
      {blog.comments.length > 0 &&
        blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      <input {...formInput} />
      <button onClick={addComment}>add comment</button>
    </div>
  )
}

export default Blog
