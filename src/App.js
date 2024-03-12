import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import MenuLink from './components/MenuLink'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'

const App = () => {
  const queryClient = useQueryClient()
  return (
    <div>
      <Notification />
      <MenuLink />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={<BlogForm />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
