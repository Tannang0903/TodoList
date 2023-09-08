import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useForm } from 'react-hook-form'
import { EditSchema, EditSchemaType } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TodoListAPI from 'src/apis/todolist.api'
import { TodoType } from 'src/types/todo.type'
import { useNavigate, useParams } from 'react-router-dom'

const FormEdit = () => {
  const { isEdited, setIsEdited } = useContext(AppContext)

  const queryClient = useQueryClient()

  const { id } = useParams()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<EditSchemaType>({
    resolver: yupResolver(EditSchema)
  })

  const TodoItemQuery = useQuery({
    queryKey: ['todoItem', id],
    queryFn: () => TodoListAPI.getTodoItem(id as string)
  })

  const todoItem = TodoItemQuery.data?.data as TodoType

  useEffect(() => {
    if (todoItem) {
      setValue('heading', todoItem?.heading)
      setValue('title', todoItem?.title)
      setValue('content', todoItem?.content)
      setValue('type', todoItem?.type)
    }
  }, [todoItem, setValue])

  const EditMutation = useMutation({
    mutationFn: TodoListAPI.editTodo
  })

  const handleSubmitForm = handleSubmit((data) => {
    const body = {
      ...data,
      createdAt: new Date().toLocaleString()
    }
    EditMutation.mutate(
      { id: todoItem.id.toString(), todo: body },
      {
        onSuccess: () => {
          navigate({
            pathname: `/`
          })
          queryClient.invalidateQueries({
            queryKey: ['todolist']
          })
          setIsEdited(false)
        }
      }
    )
  })

  const handleCloseForm = () => {
    setIsEdited(false)
    navigate({
      pathname: `/`
    })
  }

  return (
    <div
      className={classNames('absolute h-full w-full top-0 left-0 bg-black/20 z-50', {
        hidden: isEdited === false,
        block: isEdited === true
      })}
    >
      <form
        className='absolute flex items-center justify-center w-[30%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex-col bg-white p-4 rounded'
        onSubmit={handleSubmitForm}
      >
        <div className='relative text-[16px] font-bold mb-1 w-full flex justify-center'>
          <h1>Create Todo</h1>
          <button type='button' onClick={handleCloseForm}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='2.5em'
              viewBox='0 0 384 512'
              className='absolute top-[-4px] right-0 px-[12px] py-[8px] rounded text-[12px] hover:fill-slate-600'
            >
              <path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
            </svg>
          </button>
        </div>

        <div className='w-full'>
          <input
            type='text'
            className='w-full mb-1 p-1 rounded border-[1px] border-gray-500'
            placeholder='Heading'
            {...register('heading')}
          />
          <span className='block mb-1 text-red-600 text-[14px] min-h-[20px] leading-5'>{errors.heading?.message}</span>
        </div>

        <div className='w-full'>
          <input
            type='text'
            className='w-full mb-1 p-1 rounded border-[1px] border-gray-500'
            placeholder='Title'
            {...register('title')}
          />
          <span className='block mb-1 text-red-600 text-[14px] min-h-[20px] leading-5'>{errors.title?.message}</span>
        </div>

        <div className='w-full'>
          <textarea
            className='w-full mb-1 p-1 rounded border-[1px] border-gray-500'
            cols={30}
            rows={3}
            placeholder='Content'
            {...register('content')}
          />
          <span className='block mb-1 text-red-600 text-[14px] min-h-[20px] leading-5'>{errors.content?.message}</span>
        </div>

        <div className='w-full flex justify-around items-center mb-[8px]'>
          <div className='flex items-center'>
            <input type='radio' id='todo' value='Todo' {...register('type')} />
            <label htmlFor='todo'>Todo</label>
          </div>
          <div className='flex items-center'>
            <input type='radio' id='doing' value='Doing' {...register('type')} />
            <label htmlFor='doing'>Doing</label>
          </div>
          <div className='flex items-center'>
            <input type='radio' id='done' value='Done' {...register('type')} />
            <label htmlFor='done'>Done</label>
          </div>
          <span className='block mb-1 text-red-600 text-[14px] min-h-[20px] leading-5'>{errors.content?.type}</span>
        </div>

        <button type='submit' className='rounded border-[1px] border-gray-500 mt-2 p-1 hover:bg-gray-200'>
          EDIT
        </button>
      </form>
    </div>
  )
}

export default FormEdit
