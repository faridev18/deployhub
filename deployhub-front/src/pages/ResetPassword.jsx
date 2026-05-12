import React from "react"
import { Link } from "react-router"
import Card from "../components/Card"
import Button from "../components/Button"
import { Mail } from "lucide-react"

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Réinitialiser le mot de passe
          </h1>
          <p className="text-gray-600 mt-2">
            Entrez votre email pour recevoir un lien de récupération
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-6">

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Votre email"
              />
            </div>

            <Button variant="primary" size="lg" className="w-full">
              Envoyer le lien
            </Button>

            <div className="text-center text-sm">
              <Link to="/login" className="text-emerald-600 hover:underline">
                Retour à la connexion
              </Link>
            </div>

          </form>
        </Card>
      </div>
    </div>
  )
}
