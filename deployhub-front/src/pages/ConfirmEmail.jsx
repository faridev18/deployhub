import React from "react"
import { Link } from "react-router"
import Card from "../components/Card"
import Button from "../components/Button"
import { MailCheck } from "lucide-react"

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <Card className="p-10">
          <MailCheck className="w-14 h-14 text-emerald-500 mx-auto mb-6" />

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vérifiez votre email
          </h1>

          <p className="text-gray-600 mb-6">
            Nous avons envoyé un lien de confirmation à votre adresse email.
            Cliquez sur le lien pour activer votre compte.
          </p>

          <Button variant="primary" size="lg" className="w-full" as={Link} to="/login">
            Retour à la connexion
          </Button>
        </Card>

      </div>
    </div>
  )
}
