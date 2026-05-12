import React from "react";
import { AlertCircle } from "lucide-react";
import Button from "../components/Button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Une erreur est survenue</h1>
      <p className="text-gray-600 mb-6">
        Quelque chose s'est mal passé. Veuillez réessayer plus tard.
      </p>
      <Button variant="primary" size="lg" onClick={() => window.location.reload()}>
        Recharger la page
      </Button>
    </div>
  );
}
