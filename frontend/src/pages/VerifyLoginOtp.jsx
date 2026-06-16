import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Input } from '../components/ui/Input'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

export function VerifyLoginOtp() {
  const { verifyLoginOtp } = useAuth()
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from || ROUTES.DASHBOARD
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: location.state?.email || '',
      otp: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      setError('')
      const data = await verifyLoginOtp(values)
      toast.success(data.message || 'Login verified')
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="text-3xl font-semibold text-slate-950">Verify login</h1>
      <p className="mt-2 text-sm text-slate-600">Enter the 6-digit OTP sent to your email.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {error ? <ErrorMessage message={error} /> : null}
        <Input
          error={errors.email?.message}
          id="verify-login-email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
          })}
        />
        <Input
          error={errors.otp?.message}
          id="verify-login-otp"
          inputMode="numeric"
          label="OTP"
          maxLength={6}
          placeholder="123456"
          {...register('otp', {
            required: 'OTP is required',
            minLength: { value: 6, message: 'OTP must be 6 digits' },
          })}
        />
        <Button className="w-full" isLoading={isSubmitting} type="submit">
          Verify login
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Need a new code?{' '}
        <Link className="font-medium text-cyan-700 hover:text-cyan-800" to={ROUTES.LOGIN}>
          Login again
        </Link>
      </p>
    </section>
  )
}
