//import React from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

export const verifyUser = async (credential) => {
  const request = await axios.post(baseUrl, credential)
  return request.data
}
