import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

const Header = () => {
  const { setIsCreated } = useContext(AppContext)

  const handleCreateNewTodo = () => {
    setIsCreated(true)
  }

  return (
    <header className='max-w-[1200px] mx-[40px] xl:mx-auto relative flex justify-between items-end'>
      <div className='flex flex-col'>
        <img src='/src/assets/images/logo_task.png' alt='logo' className='h-[58px]' />
        <div className='flex items-center mt-2'>
          <span className='text-[16px] font-normal text-[#5a5c63]'>Lets get shit done!</span>
          <img src='/src/assets/images/peace.png' alt='imagePeace' className='w-[23px] h-[23px] mx-[6px]' />
        </div>
      </div>
      <button
        className='flex items-center text-[16px] font-normal px-2 py-1 rounded bg-white text-[#5a5c63] hover:bg-gray-300'
        onClick={handleCreateNewTodo}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='0.6em'
          viewBox='0 0 448 512'
          className='mr-[4px] fill-[#5a5c63]'
        >
          <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
        </svg>
        <span>New task</span>
      </button>
    </header>
  )
}

export default Header
