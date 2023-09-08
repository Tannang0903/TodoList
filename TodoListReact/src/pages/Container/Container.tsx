import { useQuery } from '@tanstack/react-query'
import TodoListAPI from 'src/apis/todolist.api'
import { titles } from 'src/constants/title'
import Title from './components/Title'
import TodoList from './components/TodoList'
import { TodoType } from 'src/types/todo.type'

const Container = () => {
  const todolistQuery = useQuery({
    queryKey: ['todolist'],
    queryFn: () => TodoListAPI.getTodoList()
  })
  const todolist = todolistQuery.data?.data as TodoType[]
  console.log('Container', todolist)

  return (
    <div className='max-w-[1200px] mx-[40px] xl:mx-auto grid grid-cols-3 gap-8'>
      {titles.map((title, index) => (
        <div className='col-span-3 md:col-span-1' key={index}>
          <Title todolist={todolist} title={title} />
          <TodoList todolist={todolist} title={title} />
        </div>
      ))}
    </div>
  )
}

export default Container
