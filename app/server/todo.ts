import { scheduler } from 'node:timers/promises'

import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/start'
import type { Todo } from '@prisma/client'

import { prisma } from '~/lib/prisma'

export const getTodolist = createServerFn('GET', async () => {
  const todolist = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return todolist
})

export const getTodolistQueryOptions = () =>
  queryOptions({
    queryKey: ['getTodolist'],
    queryFn: () => getTodolist(),
  })

export type CreateTodoInput = {
  name: Todo['name']
}

export const createTodo = createServerFn('POST', async ({ name }: CreateTodoInput) => {
  await scheduler.wait(300)

  await prisma.todo.create({
    data: {
      name,
      done: false,
    },
  })
})

export type UpdateTodoInput = {
  id: Todo['id']
  done: Todo['done']
}

export const updateTodo = createServerFn('POST', async ({ id, done }: UpdateTodoInput) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      done,
    },
  })
})

export type DeleteTodoInput = {
  id: Todo['id']
}

export const deleteTodo = createServerFn('POST', async ({ id }: DeleteTodoInput) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  })
})
