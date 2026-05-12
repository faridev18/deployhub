import React from "react";
import Card from "../components/Card";
import Badge from "../components/Badge";

export default function Notifications() {
  const notifications = [
    { title: "Déploiement terminé", description: "App Docker 1 déployée avec succès", type: "success" },
    { title: "Erreur", description: "Échec du build pour App Docker 2", type: "danger" },
    { title: "Nouvelle fonctionnalité", description: "Dashboard mis à jour", type: "info" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
        {notifications.map((notif, index) => (
          <Card key={index} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">{notif.title}</p>
              <p className="text-gray-600 text-sm">{notif.description}</p>
            </div>
            <Badge status={notif.type}>{notif.type.toUpperCase()}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
