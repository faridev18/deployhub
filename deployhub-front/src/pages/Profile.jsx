import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { Settings, Trash2, LogOut, Clock, Cpu, Database } from "lucide-react";

export default function Profile() {
  // Exemple de données utilisateurs (à remplacer par ton backend)
  const user = {
    username: "Lary",
    email: "lary@example.com",
    role: "Développeur",
  };

  const history = [
    { app: "App Docker 1", status: "Succès", date: "2026-02-10 14:32" },
    { app: "App Docker 2", status: "Échec", date: "2026-02-11 09:15" },
    { app: "App Docker 3", status: "Succès", date: "2026-02-12 18:47" },
  ];

  const quotas = [
    { icon: Cpu, label: "CPU utilisé", value: "2/4 cores" },
    { icon: Database, label: "Base de données", value: "1/2 instances" },
    { icon: Clock, label: "Applications déployées", value: "3/5" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Informations utilisateur */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user.username}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <Badge status="info" className="mt-2">{user.role}</Badge>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Paramètres
              </Button>
              <Button variant="danger" size="sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Supprimer le compte
              </Button>
            </div>
          </div>
        </Card>

        {/* Quotas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotas.map((quota, index) => {
            const Icon = quota.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{quota.value}</div>
                <div className="text-sm text-gray-600">{quota.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Historique d'utilisation */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des déploiements</h2>
          <div className="divide-y divide-gray-200">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-900">{item.app}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <Badge status={item.status === "Succès" ? "success" : "danger"}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Déconnexion */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            <LogOut className="w-5 h-5 mr-2" />
            Se déconnecter
          </Button>
        </div>

      </div>
    </div>
  );
}
