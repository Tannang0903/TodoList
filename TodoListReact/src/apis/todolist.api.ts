import { TodoType } from 'src/types/todo.type'
import http from '../utils/http'

const TodoListAPI = {
  getTodoList: () => http.get<TodoType[]>('/todolist'),

  getTodoItem: (id: string) => http.get<TodoType>(`/todolist/${id}`),

  createTodo: (todo: Omit<TodoType, 'id'>) => http.post<TodoType>('/todolist', todo),

  editTodo: (body: { id: string; todo: Omit<TodoType, 'id'> }) => http.put<TodoType>(`/todolist/${body.id}`, body.todo),

  deleteTodo: (id: string) => http.delete(`/todolist/${id}`)
}

export default TodoListAPI
