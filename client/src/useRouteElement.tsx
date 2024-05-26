import { useRoutes } from 'react-router-dom'
import MainLayout from './pages/MainLayout/MainLayout'
import Register from './pages/Register/Register'
import Login from './pages/Login'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/register',
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      )
    },
    {
      path: '/dashboard',
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      )
    },
    {
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    }
  ])
  return routeElement
}
