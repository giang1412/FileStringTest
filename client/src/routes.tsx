import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/index'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])

export default router
