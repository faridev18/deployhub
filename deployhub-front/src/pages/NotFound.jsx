import React from "react";
import { Link } from "react-router";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oups ! Page non trouvée</p>
      <Button variant="primary" size="lg" as={Link} to="/">
        Retour à l'accueil
      </Button>
    </div>
  );
}
