//import React from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

export const getUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
