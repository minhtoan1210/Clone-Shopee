import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import RegisterLayout from './layouts/RegisterLayout'
import ProductList from './pages/ProductList'
import MainLayout from './layouts/MainLayout/MainLayout'
import Register from './pages/Register'

const isAuthenticated = false
//Outlet dùng để truy xuất các thành phần con của chúng
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      // nhớ xác định thành phần chín bằng
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
