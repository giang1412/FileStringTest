/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsAuthenticated(Boolean(token))
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const logout = async () => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (!accessToken || !refreshToken) {
      navigate('/login')
      return
    }

    try {
      const response = await fetch(`http://localhost:4000/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed')
      }

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setIsAuthenticated(false)
      toast({
        description: data.message,
        className: 'bg-green-500 text-white'
      })
      navigate('/login')
    } catch (error: any) {
      console.log(error)
      toast({
        description: 'Đã xảy ra lỗi, vui lòng thử lại.',
        className: 'bg-red-600 text-white'
      })
    }
  }

  return (
    <div>
      <p className='read-the-docs w-800px'>
        {isAuthenticated ? (
          <div className='w-[800px]'>
            <span className='text-5xl flex justify-center w-full'>Hello, you are logged in.</span>
            <Button
              onClick={logout}
              className='mt-8 w-[230px] h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-gray-200 py-2 rounded'
            >
              Đăng Xuất
            </Button>
          </div>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </p>
    </div>
  )
}

export default Dashboard
