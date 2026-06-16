import { motion } from 'framer-motion'
import { ArrowRight, Gauge, LockKeyhole, Server } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { ROUTES } from '../constants/routes'

const features = [
  { icon: Server, title: 'Service layer', text: 'Axios clients and API calls stay out of page components.' },
  { icon: LockKeyhole, title: 'Protected routing', text: 'Private screens are grouped behind an auth-aware route boundary.' },
  { icon: Gauge, title: 'Fast foundation', text: 'Vite, React 19, Tailwind CSS, and focused reusable components.' },
]

export function Home() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.45 }}
      >
        <PageHeader
          description="A clean frontend starter with routing, authentication structure, API wiring, reusable controls, and sensible loading and error states."
          eyebrow="React 19 frontend"
          title="Ship a scalable React app foundation."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} size="lg" to={ROUTES.DASHBOARD}>
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button as={Link} size="lg" to={ROUTES.LOGIN} variant="secondary">
            Sign in
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-4">
        {features.map((feature) => (
          <motion.article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            initial={{ opacity: 0, y: 12 }}
            key={feature.title}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <feature.icon className="h-6 w-6 text-cyan-700" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
