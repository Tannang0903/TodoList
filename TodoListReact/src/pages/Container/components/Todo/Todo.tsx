import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import TodoListAPI from 'src/apis/todolist.api'
import { AppContext } from 'src/contexts/app.context'
import { TodoType } from 'src/types/todo.type'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { useDrag } from 'react-dnd'

interface Props {
  item: TodoType
  tasks: TodoType[]
}

const Todo = ({ item, tasks }: Props) => {
  const { setIsEdited } = useContext(AppContext)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TodoListAPI.deleteTodo(id)
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: item.id.toString(), tasks: tasks },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Xóa công việc thành công !')
        queryClient.invalidateQueries({
          queryKey: ['todolist']
        })
      }
    })
  }

  const handleEditTodo = (id: string) => {
    setIsEdited(true)
    navigate({
      pathname: `/${id}`
    })
  }

  return (
    <div
      className={classNames(
        ' rounded-[4px] py-[16px] px-[24px] mt-[22px] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]',
        {
          'bg-gray-300': isDragging
        }
      )}
      ref={drag}
    >
      <div className='w-full flex items-center justify-between'>
        <h3 className='block text-[14px] font-bold text-[#4d8eff] underline min-h-[14px] '>{item.heading}</h3>
        <div className='flex justify-center ml-[6px]'>
          <button onClick={() => handleEditTodo(item.id.toString())}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='0.9em'
              viewBox='0 0 512 512'
              className='text-[16px] px-[6px] cursor-pointer fill-[#5b392c] hover:fill-[#9a5033]'
            >
              <path d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z' />
            </svg>
          </button>
          <button onClick={() => handleDeleteTodo(item.id.toString())}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='0.9em'
              viewBox='0 0 448 512'
              className='text-[16px] px-[6px] cursor-pointer fill-[#ed3535] hover:fill-[#cf2121]'
            >
              <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
            </svg>
          </button>
        </div>
      </div>
      <div className='overflow-hidden border-b-[1px] border-gray-500 py-1'>
        <span className='text-[16px] font-bold text-[#393939] line-clamp-2'>{item.title}</span>
      </div>
      <div>
        <p className='block my-[12px] text-[12px] text-gray-700 min-h-[60px]'>{item.content}</p>
        <div className='flex items-center'>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
            <path d='M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
          </svg>
          <span className='font-normal text-[12px] leading-[13px] text-[#5a5c63] ml-2'>{item.createdAt}</span>
        </div>
      </div>
    </div>
  )
}

export default Todo
