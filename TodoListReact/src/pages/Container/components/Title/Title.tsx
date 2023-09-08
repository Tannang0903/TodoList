import classNames from 'classnames'
import { Fragment } from 'react'
import { TitleType } from 'src/types/title.type'
import { TodoType } from 'src/types/todo.type'

interface Props {
  title: TitleType
  todolist: TodoType[] | undefined
}

const Title = ({ title, todolist }: Props) => {
  return (
    <Fragment>
      <div
        className={classNames(
          'flex items-center justify-between h-[34px] font-bold text-[16px] rounded p-3 text-white my-[20px]',
          {
            'bg-[#00a6da]': title.id === '1',
            'bg-[#e2d072]': title.id === '2',
            'bg-[#3bc057]': title.id === '3'
          }
        )}
      >
        <span>{title.name}</span>
        <span
          className={classNames('text-[14px] rounded px-[6px] py-[4px] leading-[14px]', {
            'bg-[#00cdda]': title.id === '1',
            'bg-[#dab700]': title.id === '2',
            'bg-[#53c76a]': title.id === '3'
          })}
        >
          {todolist?.filter((item) => item.type === title.name).length}
        </span>
      </div>
      <div
        className={classNames('h-[2px] w-full mb-2', {
          'bg-[#00a6da]': title.id === '1',
          'bg-[#e2d072]': title.id === '2',
          'bg-[#3bc057]': title.id === '3'
        })}
      ></div>
    </Fragment>
  )
}

export default Title
