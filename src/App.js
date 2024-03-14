import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import MenuLink from './components/MenuLink'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
//import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import { useLoginHook } from './hooks'

const App = () => {
  const [credentials, setCredential] = useState(null)
  const result = useLoginHook(credentials)

  const handleLogin = (credential) => {
    setCredential(credential)
  }

  return (
    <div>
      <Notification />

      <MenuLink />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        {/*
        <Route path="/blogs" element={<BlogForm />} />
  */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
