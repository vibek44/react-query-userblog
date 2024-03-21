import React from 'react'
const Style = {
  paddingTop: 10,
}
const Footer = () => {
  return (
    <div style={Style}>
      Bloglist app for | <a href='http://localhost:3001'>blog-user</a>. See{' '}
      <a href='https://github.com/vibek44/react-query-userblog/blob/main/README.md'>
        userblogs
      </a>{' '}
      for the source code.
    </div>
  )
}

export default Footer
