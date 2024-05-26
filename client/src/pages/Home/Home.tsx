import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Link to='/login'>
        <Button className='m-8 w-[230px] h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-gray-200 py-2 rounded '>
          Đăng nhập
        </Button>
      </Link>
      <Link to='register'>
        <Button className='m-8 w-[230px] h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-gray-200 py-2 rounded '>
          Đăng ký
        </Button>
      </Link>
    </div>
  )
}
