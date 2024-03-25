import React from 'react'
import { useField } from '../hooks/index'
import { Button, Form } from 'react-bootstrap'
const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    createBlog({ title: title.value, author: author.value, url: url.value })
  }

  const Style = { width: 200 }
  return (
    <Form onSubmit={handleBlogAdd}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control style={Style} {...title} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control style={Style} {...author} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Url</Form.Label>
        <Form.Control style={Style} {...url} />
      </Form.Group>
      <Button variant='primary' type='submit'>
        create
      </Button>
    </Form>
  )
}

export default BlogForm
