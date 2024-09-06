import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import type { FormEvent } from 'react'

import { createTodo, deleteTodo, getTodolistQueryOptions, updateTodo } from '~/api/todo'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getTodolistQueryOptions(),
    )
  },
  component: Home,
})

const formSchema = z.object({
  name: z.string().trim().min(1),
})

function Home() {
  const todolistQuery = useSuspenseQuery(
    getTodolistQueryOptions(),
  )

  const createTodoMutation = useMutation({
    mutationKey: ['createTodo'],
    mutationFn: createTodo,
    onSuccess: () => {
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const dataParsed = formSchema.parse(data)

    createTodoMutation.mutate({ name: dataParsed.name }, {
      onSuccess: () => form.reset(),
    })
  }

  return (
    <div className='p-2'>
      <form onSubmit={handleSubmit} className='flex gap-2 mb-2'>
        <input name='name' type='text' className='border' />
        <button type='submit'>➕</button>
      </form>

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
