import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Resgiter from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import ProductList from './pages/ProductList'
import MainLayout from './layouts/MainLayout/MainLayout'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Resgiter />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}
