import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import type { FormEvent } from 'react'

import { createTodo, deleteTodo, getTodolistQueryOptions, updateTodo } from '~/server/todo'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
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
    onSuccess: handleMutationSuccess,
  })

  const updateTodoMutation = useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: updateTodo,
    onSuccess: handleMutationSuccess,
  })

  const deleteTodoMutation = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: deleteTodo,
    onSuccess: handleMutationSuccess,
  })

  function handleMutationSuccess() {
    todolistQuery.refetch()
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (createTodoMutation.isPending) return

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const dataParsed = formSchema.parse(data)

    const promise = createTodoMutation.mutateAsync(dataParsed, {
      onSuccess: () => form.reset(),
      onError: (e) => console.error(`Error from server function: ${e.message}`),
    })

    toast.promise(promise, {
      loading: 'Creating todo...',
      success: 'Todo created',
      error: 'Failed to create todo',
    })
  }

  return (
    <div className='space-y-2 p-2'>
      <form onSubmit={handleSubmit} className='flex gap-2'>
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
