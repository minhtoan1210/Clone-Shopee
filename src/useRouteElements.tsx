import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Resgiter from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import ProductList from './pages/ProductList'

export default function useRouteElements() {
  const routeElements = useRoutes([
    { path: '/', element: <ProductList /> },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/resgiter',
      element: <RegisterLayout />,
      children: [
        {
          path: '',
          element: <Resgiter />
        }
      ]
    }
  ])
  return routeElements
}
