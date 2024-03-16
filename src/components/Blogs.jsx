import React, { useContext } from 'react'
import { UserContext } from '../context'
import { useBlogHook } from '../hooks'

const Blogs = ({ handleLike, handleRemove }) => {
  const [user] = useContext(UserContext)
  const { result } = useBlogHook()
  //console.log(data)
  if (user && result.data)
    return (
      <>
        <h3>
          welcome <em>{user.username}</em>
        </h3>
        <h4>BlogList</h4>
        {result.data.map((blog) => (
          <div key={blog.id}>
            <p>
              {blog.title}
              <button onClick={() => handleLike(blog)}>like</button>
              <button onClick={() => handleRemove(blog.id)}>delete</button>
            </p>
            <p>likes:{blog.likes}</p>
          </div>
        ))}
      </>
    )

  return <h1>Blogs view</h1>
}

export default Blogs
