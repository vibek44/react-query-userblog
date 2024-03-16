import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blogObject) => {
  const config = {
    headers: { authorization: token },
  }
  const request = await axios.post(baseUrl, blogObject, config)
  return request.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { authorization: token },
  }
  const request = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
}
