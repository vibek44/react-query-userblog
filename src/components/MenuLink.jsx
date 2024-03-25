import React, { useContext } from 'react'
import { UserContext } from '../context'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const MenuLink = ({ handleLogOut }) => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const handleSignOut = () => {
    handleLogOut()
    navigate('/')
  }
  const Style = {
    paddingRight: 5,
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={Style} to='/home'>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={Style} to='/'>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={Style} to='/users'>
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {user ? (
              <>
                {user.username} signed in
                <button onClick={handleSignOut}>Logout</button>
              </>
            ) : (
              <Link style={Style} to='/login'>
                login
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MenuLink
