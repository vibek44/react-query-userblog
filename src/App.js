import React, { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import MenuLink from './components/MenuLink'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import Blogs from './components/Blogs'
import { useBlogHook, useLoginHook } from './hooks'
import { UserContext } from './context'

const App = () => {
  const navigate = useNavigate()
  const [user, userDispatch] = useContext(UserContext)
  const [credentials, setCredential] = useState(null)
  useLoginHook(credentials)
  const { createMutation, likeMutation, removeMutation } = useBlogHook()

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

  return (
    <div>
      <Notification />

      <MenuLink handleLogOut={handleLogOut} />
      <Routes>
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/blogs"
          element={
            <Blogs handleLike={handleLike} handleRemove={handleRemove} />
          }
        />
        <Route
          path="/create"
          element={
            user ? (
              <BlogForm createBlog={createBlog} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
