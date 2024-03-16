import React, { useState, useContext, useEffect } from 'react'
import { UserContext, NotificationContext } from '../context'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { verifyUser } from '../services/loginrequest'
import blogRequest from '../services/blogrequest'
import { useNavigate } from 'react-router-dom'

export const useLoginHook = (credentials) => {
  const navigate = useNavigate()
  const [, userDispatch] = useContext(UserContext)
  const [, notificationDispatch] = useContext(NotificationContext)

  useEffect(() => {
    if (credentials) {
      verifyUser(credentials)
        .then((data) => {
          userDispatch({ type: 'setUser', payload: data })
          blogRequest.setToken(data.token)
          navigate('/blogs')
        })
        .catch((error) => {
          notificationDispatch({
            type: 'setNotification',
            payload: error.response.data.error,
          })
          setTimeout(() => {
            notificationDispatch({
              type: 'setNotification',
              payload: '',
            })
          }, 3000)
        })
    }
  }, [credentials])
}

export const useBlogHook = () => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const [, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        if (user) {
          let blogs = await blogRequest.getAll()
          return blogs
        }
      } catch (error) {
        notificationDispatch({
          type: 'setNotification',
          payload: error.response.data.error,
        })
      }
      return null
    },
  })

  const createMutation = useMutation({
    mutationFn: blogRequest.create,
    onSuccess: (createdBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(createdBlog))
      navigate('/blogs')
    },
    onError: (error) => {
      notificationDispatch({
        type: 'setNotification',
        payload: error.response.data.error,
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'setNotification',
          payload: '',
        })
      }, 3000)
    },
  })

  const likeMutation = useMutation({
    mutationFn: blogRequest.update,
    onSuccess: (updatedBlog) => {
      console.log(updatedBlog)

      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (updatedBlog.id !== blog.id ? blog : updatedBlog))
      )
      navigate('/blogs')
    },
    onError: (error) => {
      notificationDispatch({
        type: 'setNotification',
        payload: error.response.data.error,
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'setNotification',
          payload: '',
        })
      }, 3000)
    },
  })

  const removeMutation = useMutation({
    mutationFn: blogRequest.remove,
    onSuccess: (removedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => removedBlog.id !== blog.id)
      )
      navigate('/blogs')
    },
    onError: (error) => {
      notificationDispatch({
        type: 'setNotification',
        payload: error.response.data.error,
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'setNotification',
          payload: '',
        })
      }, 3000)
    },
  })

  return { result, createMutation, likeMutation, removeMutation }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
