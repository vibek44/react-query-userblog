import React, { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import MenuLink from './components/MenuLink'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import UserBlog from './components/UserBlog'
import { useBlogHook, useLoginHook } from './hooks'
import { UserContext } from './context'
import Users from './components/User'

const App = () => {
  const navigate = useNavigate()
  const [user, userDispatch] = useContext(UserContext)
  const [credentials, setCredential] = useState(null)
  useLoginHook(credentials)
  const { createMutation, likeMutation, removeMutation, commentMutation } =
    useBlogHook()

  const handleLogin = (credential) => {
    setCredential(credential)
  }

  const handleLogOut = () => {
    userDispatch({ type: 'setUser', payload: null })
  }

  const createBlog = (blog) => {
    createMutation.mutate(blog)
  }

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    likeMutation.mutate(updatedBlog)
  }

  const handleRemove = (id) => {
    removeMutation.mutate(id)
  }

  const handleComment = (id, comment) => {
    commentMutation.mutate({ id, comment: { comment } })
  }

  return (
    <div>
      <Notification />

      <MenuLink handleLogOut={handleLogOut} />
      <Routes>
        <Route
          path='/user/:id'
          element={<UserBlog handleLogOut={handleLogOut} />}
        />
        <Route path='/users' element={<Users handleLogOut={handleLogOut} />} />
        <Route
          path='/login'
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path='/blog/:id'
          element={
            <Blog
              handleLogOut={handleLogOut}
              handleLike={handleLike}
              handleComment={handleComment}
            />
          }
        />

        <Route
          path='/create'
          element={
            user ? (
              <BlogForm createBlog={createBlog} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/'
          element={
            <Blogs handleLike={handleLike} handleRemove={handleRemove} />
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
