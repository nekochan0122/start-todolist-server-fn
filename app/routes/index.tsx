import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { createTodo, deleteTodo, getTodolistQueryOptions, updateTodo } from '~/api/todo'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getTodolistQueryOptions(),
    )
  },
  component: Home,
})

function Home() {
  const [name, setName] = useState('')

  const todolistQuery = useSuspenseQuery(
    getTodolistQueryOptions(),
  )

  const createTodoMutation = useMutation({
    mutationKey: ['createTodo'],
    mutationFn: createTodo,
    onSuccess: () => {
      setName('')
      todolistQuery.refetch()
    },
  })

  const updateTodoMutation = useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: updateTodo,
    onSuccess: () => {
      todolistQuery.refetch()
    },
  })

  const deleteTodoMutation = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: deleteTodo,
    onSuccess: () => {
      todolistQuery.refetch()
    },
  })

  return (
    <div className='p-2'>
      <div className='flex gap-2 mb-2'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)} className='border-black border'
        />
        <button onClick={() => createTodoMutation.mutate({ name })}>
          ➕
        </button>
      </div>

      <div className='space-y-1'>
        {todolistQuery.data.map((todo) => (
          <div key={todo.id}>
            <button onClick={() => updateTodoMutation.mutate({ ...todo, done: !todo.done })}>
              {todo.done ? '✅' : '❌'}
            </button>
            <span>{todo.name}</span>
            <button onClick={() => deleteTodoMutation.mutate(todo)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
