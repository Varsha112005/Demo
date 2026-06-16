import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../components/ui/Button'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Input } from '../components/ui/Input'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values) => {
    try {
      setError('')
      const data = await login(values)
      toast.success(data.message || 'Login OTP sent')
      navigate(ROUTES.VERIFY_LOGIN_OTP, {
        state: { email: values.email, from },
      })
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="text-3xl font-semibold text-slate-950">Login</h1>
      <p className="mt-2 text-sm text-slate-600">Enter your credentials. A login OTP will be sent to your email.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {error ? <ErrorMessage message={error} /> : null}
        <Input
          error={errors.email?.message}
          id="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
          })}
        />
        <Input
          error={errors.password?.message}
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        <Button className="w-full" isLoading={isSubmitting} type="submit">
          Login
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        New here?{' '}
        <Link className="font-medium text-cyan-700 hover:text-cyan-800" to={ROUTES.REGISTER}>
          Create an account
        </Link>
      </p>
    </section>
  )
}
