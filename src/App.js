import React from 'react'
import { useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  return (
    <div>
      <p>Welcome React</p>
    </div>
  )
}

export default App
