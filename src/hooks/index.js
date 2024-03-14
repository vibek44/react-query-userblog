import React, { useState, useContext, useEffect } from 'react'
import { UserContext, NotificationContext } from '../context'
import { useQuery } from '@tanstack/react-query'
import { verifyUser } from '../services/loginrequest'

export const useLoginHook = (credentials) => {
  const [, userDispatch] = useContext(UserContext)
  const [, notificationDispatch] = useContext(NotificationContext)

  useEffect(() => {
    if (credentials) {
      verifyUser(credentials)
        .then((data) => {
          userDispatch({ type: 'setUser', payload: data })
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
