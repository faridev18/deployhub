import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmEmail from './pages/ConfirmEmail'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import ErrorPage from './pages/ErrorPage'
import Dashboard from './pages/Dashboard'
import CreateProject from './pages/CreateProject'
import ProjectDetail from './pages/ProjectDetail'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/error" element={<ErrorPage />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

