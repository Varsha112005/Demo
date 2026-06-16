import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  )
}
