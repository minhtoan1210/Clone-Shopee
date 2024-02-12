import { ToastContainer } from 'react-toastify'
import './App.css'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/app.context'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routeElements = useRouteElements()

  const { reset } = useContext(AppContext)

  // trường hợp này dùng khi token hết hạn để tránh trường hợp token hết hạn mà người dùng vẫn có thể đăng nhập 1 số rule cần token
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    console.log('clearLS App')
    return () => {
      console.log('clearLS Return')
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
