import { NavLink, Outlet, useNavigate } from 'react-router'
import { useState } from 'react'
import {
  LayoutDashboard,
  Plus,
  Bell,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Rocket,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects/new', icon: Plus, label: 'Nouveau projet' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/profile', icon: UserIcon, label: 'Profil' },
]

function SidebarContent({ user, onLogout, onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
        <div className="w-9 h-9 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
          <Rocket className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-gray-900">DeployHub</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="px-2 py-2 mb-2">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {user?.username}
          </p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
        <SidebarContent user={user} onLogout={handleLogout} />
      </aside>

      {/* Mobile topbar */}
      <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-md flex items-center justify-center text-white">
              <Rocket className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-900">DeployHub</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-end p-3">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <SidebarContent
            user={user}
            onLogout={handleLogout}
            onNavigate={() => setMobileOpen(false)}
          />
        </aside>
      </div>

      {/* Main */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
