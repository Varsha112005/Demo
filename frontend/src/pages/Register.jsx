import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../components/ui/Button'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Input } from '../components/ui/Input'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

export function Register() {
  const { register: createAccount } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: { email: '', name: '', password: '' },
  })

  const onSubmit = async (values) => {
    try {
      setError('')
      const data = await createAccount(values)
      toast.success(data.message || 'OTP sent to your email')
      navigate(ROUTES.VERIFY_REGISTER_OTP, {
        state: { email: values.email },
      })
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="text-3xl font-semibold text-slate-950">Register</h1>
      <p className="mt-2 text-sm text-slate-600">Create an account. We will email an OTP to verify your address.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {error ? <ErrorMessage message={error} /> : null}
        <Input
          error={errors.name?.message}
          id="name"
          label="Name"
          placeholder="Your name"
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          error={errors.email?.message}
          id="register-email"
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
          id="register-password"
          label="Password"
          placeholder="Create a password"
          type="password"
          {...register('password', {
            minLength: { value: 6, message: 'Use at least 6 characters' },
            required: 'Password is required',
          })}
        />
        <Button className="w-full" isLoading={isSubmitting} type="submit">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Already registered?{' '}
        <Link className="font-medium text-cyan-700 hover:text-cyan-800" to={ROUTES.LOGIN}>
          Login
        </Link>
      </p>
    </section>
  )
}
