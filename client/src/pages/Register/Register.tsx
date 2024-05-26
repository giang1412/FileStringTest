/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Link, useNavigate } from 'react-router-dom'
const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirm_password: z.string().min(6).max(100)
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu và xác nhận mật khẩu không khớp',
    path: ['confirm_password']
  })

function Register() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`http://localhost:4000/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if (!response.ok) {
        throw data
      }

      toast({
        description: data.message,
        className: 'bg-green-500 text-white'
      })
      navigate('/login')
    } catch (error: any) {
      toast({
        description: error.errors.email.msg || 'Đã xảy ra lỗi, vui lòng thử lại.',
        className: 'bg-red-600 text-white'
      })
    }
  }
  return (
    <div className='bg-slate-200 p-8 shadow-lg rounded-lg border border-gray-200 max-w-md w-full'>
      <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 h-12 font-semibold text-4xl mb-4'>
        Register
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mb-2' noValidate>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='h-20'>
                <FormLabel className='flex justify-start'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email...' type='email' {...field} />
                </FormControl>
                <FormMessage className='text-red-600' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='h-20'>
                <FormLabel className='flex justify-start'>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder='Password...' type='password' {...field} />
                </FormControl>
                <FormMessage className='text-red-600' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem className='h-20'>
                <FormLabel className='flex justify-start '>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder='Confirm password...' type='password' {...field} />
                </FormControl>
                <FormMessage className='text-red-600' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='!mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-gray-200 py-2 rounded'
          >
            Đăng ký
          </Button>
        </form>
      </Form>
      <span>
        Đã có tài khoản. <Link to='/login'> Đăng nhập</Link>
      </span>
    </div>
  )
}

export default Register
