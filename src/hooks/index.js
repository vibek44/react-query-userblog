import React, { useState, useContext, useEffect } from 'react'
import { UserContext, NotificationContext } from '../context'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { verifyUser } from '../services/loginrequest'
import blogRequest from '../services/blogrequest'
import { getUsers } from '../services/usersrequest'
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
          navigate('/')
        })
        .catch((error) => {
          console.log(error);
          
          if(error.message){
          notificationDispatch({
            type: 'setNotification',
            payload: error.message,
          })}
          if(error.response){
          notificationDispatch({
            type: 'setNotification',
            payload: error.response.data.error,
          })
        }
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
  const resultblog = useQuery({
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
  const resultuser = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        if (user) {
          let blogUser = await getUsers()
          return blogUser
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
      const blogs = queryClient.getQueryData(['blogs'])
      //console.log(blogs)

      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (updatedBlog.id !== blog.id ? blog : updatedBlog))
      )
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

  const commentMutation = useMutation({
    mutationFn: blogRequest.commentUpdate,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      //console.log(blogs)

      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (updatedBlog.id !== blog.id ? blog : updatedBlog))
      )
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

  return {
    resultblog,
    resultuser,
    createMutation,
    likeMutation,
    removeMutation,
    commentMutation,
  }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onSubmit = (e) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onSubmit,
  }
}
