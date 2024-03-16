import React, { useContext } from 'react'
import { UserContext } from '../context'
import { Link } from 'react-router-dom'

const Home = () => {
  const [user] = useContext(UserContext)

  if (user)
    return (
      <div>
        <p>welcome {user.username} to user Bloglist App</p>
        <em>
          please continue to search for blogs and <b>create</b> your own
        </em>
      </div>
    )

  return (
    <div>
      <h2>Welcome to Bloglist App</h2>
      <p>
        login to
        <Link to="/login">
          {' '}
          <em> continue</em>
        </Link>
      </p>
    </div>
  )
}

export default Home
