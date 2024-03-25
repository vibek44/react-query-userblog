import React, { useContext } from 'react'
import { UserContext } from '../context'
import { useBlogHook } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ handleLike, handleRemove }) => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const { resultblog } = useBlogHook()
  const handleLikes = (blog) => {
    handleLike(blog)
    navigate('/')
  }

  if (user && resultblog.data)
    return (
      <>
        <h3>
          welcome <em>{user.username}</em>
        </h3>
        <h4>BlogList</h4>
        <Link to='/create'>create blog</Link>
        <Table striped>
          <tbody>
            {resultblog.data.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>
                  <button onClick={() => handleLikes(blog)}>like</button>
                </td>
                <td>
                  <button onClick={() => handleRemove(blog.id)}>delete</button>
                </td>
                <td>likes:{blog.likes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )

  return (
    <div>
      <h2>Welcome to Bloglist App</h2>
      <p>
        login to
        <Link to='/login'>
          {' '}
          <em> continue</em>
        </Link>
      </p>
    </div>
  )
}

export default Blogs
