import React, { useState } from "react"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import Input from "../components/Input"
import { Link, useNavigate, useLocation } from "react-router"
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(identifier, password)
      const dest = location.state?.from?.pathname || "/dashboard"
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.response?.data?.detail || "Identifiants incorrects")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Badge status="info">Espace sécurisé</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Connexion à DeployHub
          </h1>
          <p className="text-gray-600 mt-2">
            Accédez à votre tableau de bord et gérez vos déploiements
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Input
              icon={Mail}
              label="Email ou nom d'utilisateur"
              placeholder="exemple@email.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              required
            />

            <Input
              icon={Lock}
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <Button variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {loading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="text-center text-sm">
              <Link to="/reset-password" className="text-emerald-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                Créer un compte
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

