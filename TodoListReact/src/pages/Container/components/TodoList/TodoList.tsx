import { useDrop } from 'react-dnd'
import classNames from 'classnames'
import Todo from '../Todo'
import { TitleType } from 'src/types/title.type'
import { TodoType } from 'src/types/todo.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TodoListAPI from 'src/apis/todolist.api'

interface Props {
  title: TitleType
  todolist: TodoType[]
}

interface Data {
  id: string
  tasks: TodoType[]
}

const TodoList = ({ title, todolist }: Props) => {
  const queryClient = useQueryClient()

  const EditMutation = useMutation({
    mutationFn: TodoListAPI.editTodo
  })

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: Data) => handleChangeType(item.id, item.tasks),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const handleChangeType = (id: string, tasks: TodoType[]) => {
    tasks?.map((item) => {
      if (item.id.toString() === id) {
        const body = {
          ...item,
          type: title.name,
          createdAt: new Date().toLocaleString()
        }
        EditMutation.mutate(
          { id: item.id.toString(), todo: body },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['todolist']
              })
            }
          }
        )
      }
    })
  }

  return (
    <div
      ref={drop}
      className={classNames(
        'overflow-y-scroll pt-[4px] pb-[12px] px-[6px] max-h-[70vh] shadow-[inset_-12px_-8px_40px_#46464620] rounded',
        {
          'bg-gray-200': isOver
        }
      )}
    >
      {todolist?.map((item, index) => {
        if (title.name === item.type) {
          return <Todo key={index} item={item} tasks={todolist} />
        }
      })}
    </div>
  )
}

export default TodoList
