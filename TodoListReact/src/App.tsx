import FormCreate from './components/FormCreate'
import FormEdit from './components/FromEdit'
import Container from './pages/Container'
import Header from './pages/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Fragment } from 'react'
import { useRoutes } from 'react-router-dom'

const App = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: (
        <Fragment>
          <Header />
          <Container />
          <FormCreate />
        </Fragment>
      )
    },
    {
      path: '/:id',
      element: (
        <Fragment>
          <Header />
          <Container />
          <FormEdit />
        </Fragment>
      )
    }
  ])
  return (
    <div className='relative h-screen w-full pt-[36px] '>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
