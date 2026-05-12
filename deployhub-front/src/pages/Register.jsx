import React, { useState } from "react"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import Input from "../components/Input"
import { Link, useNavigate } from "react-router"
import { Mail, Lock, User as UserIcon, UserPlus, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.")
      return
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    setLoading(true)
    try {
      await register({ username, email, password })
      setSuccess("Compte créé ! Vérifiez votre email pour confirmer.")
      setTimeout(() => navigate("/login"), 1800)
    } catch (err) {
      setError(err.response?.data?.detail || "Inscription impossible")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Badge status="success">Nouveau compte</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Créer votre compte
          </h1>
          <p className="text-gray-600 mt-2">
            Commencez à déployer vos applications en quelques minutes
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
            {success && (
              <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-700">{success}</p>
              </div>
            )}

            <Input
              icon={UserIcon}
              label="Nom d'utilisateur"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />

            <Input
              icon={Mail}
              type="email"
              label="Email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <Input
              icon={Lock}
              type="password"
              label="Mot de passe"
              placeholder="Au moins 8 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <Input
              icon={Lock}
              type="password"
              label="Confirmer le mot de passe"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <Button variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              {loading ? "Création..." : "Créer le compte"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Déjà inscrit ?{" "}
              <Link to="/login" className="text-emerald-600 font-medium hover:underline">
                Se connecter
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

