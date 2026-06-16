import { CalendarDays, CheckCircle2, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageHeader } from '../components/common/PageHeader'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Loader } from '../components/ui/Loader'
import { useAuth } from '../hooks/useAuth'
import { formatReadableDate } from '../utils/formatDate'

const metrics = [
  { icon: Users, label: 'Active users', value: '2,480' },
  { icon: CheckCircle2, label: 'Completed tasks', value: '1,284' },
  { icon: CalendarDays, label: 'Today', value: formatReadableDate(new Date()) },
]

export function Dashboard() {
  const { refreshProfile, user } = useAuth()
  const [error, setError] = useState('')
  const [isProfileLoading, setIsProfileLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError('')
        await refreshProfile()
      } catch (err) {
        setError(err.message)
      } finally {
        setIsProfileLoading(false)
      }
    }

    loadProfile()
  }, [refreshProfile])

  if (isProfileLoading) {
    return <Loader label="Loading profile" />
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        description={`Welcome ${user?.name || 'back'}. Your account details are loaded from the protected profile API.`}
        eyebrow="Protected"
        title="Dashboard"
      />

      {error ? <div className="mt-6"><ErrorMessage message={error} /></div> : null}

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={metric.label}>
            <metric.icon className="h-5 w-5 text-cyan-700" />
            <p className="mt-4 text-sm text-slate-500">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-950">{metric.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Account</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="mt-1 font-medium text-slate-950">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-1 font-medium text-slate-950">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Verified</dt>
            <dd className="mt-1 font-medium text-slate-950">{user?.isEmailVerified ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
