import React from 'react'
import { useField } from '../hooks/index'
const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    createBlog({ title: title.value, author: author.value, url: url.value })
  }
  return (
    <form onSubmit={handleBlogAdd}>
      <fieldset>
        <legend>create blog</legend>
        <div>
          Title
          <input {...title} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          Url
          <input {...url} />
        </div>
        <button name="submitbutton" type="submit">
          create
        </button>
      </fieldset>
    </form>
  )
}

export default BlogForm
