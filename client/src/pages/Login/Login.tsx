/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100)
})

function Login() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await fetch(`http://localhost:4000/auth/login`, {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })

      toast({
        className: 'bg-[#84cc16] text-white',
        description: result.payload.message
      })
      localStorage.setItem('access_token', result.payload.result.access_token)
      localStorage.setItem('refresh_token', result.payload.result.refresh_token)
      navigate('/dashboard')
    } catch (error: any) {
      const status = error.status as number
      if (status === 422) {
        toast({
          className: 'bg-red-600 text-white',
          description: error.payload.errors.email.msg,
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <div className='bg-slate-200 p-8 shadow-lg rounded-lg border border-gray-200 max-w-md w-full'>
      <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 h-12 font-semibold text-4xl mb-4'>
        Login
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

          <Button
            type='submit'
            className='!mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-gray-200 py-2 rounded'
          >
            Đăng nhập
          </Button>
        </form>
      </Form>
      <span>
        Bạn chưa có tài khoản? <Link to='/register'> Đăng ký</Link>
      </span>
    </div>
  )
}

export default Login
