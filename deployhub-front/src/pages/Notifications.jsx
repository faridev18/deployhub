import { useEffect, useMemo, useState } from 'react'
import { Bell, Loader2 } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { deploymentsApi } from '../api/deployments'

const STATUS_TO_NOTIFICATION = {
  running: { title: 'Application démarrée', type: 'success' },
  stopped: { title: 'Application arrêtée', type: 'warning' },
  pending: { title: 'Déploiement en attente', type: 'info' },
  cloning: { title: 'Clonage du dépôt', type: 'info' },
  extracting: { title: 'Extraction de l\'archive', type: 'info' },
  building: { title: 'Build en cours', type: 'info' },
  starting: { title: 'Démarrage en cours', type: 'info' },
  failed: { title: 'Échec du déploiement', type: 'error' },
}

function formatDate(dateValue) {
  if (!dateValue) return '-'
  return new Date(dateValue).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Notifications() {
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const items = await deploymentsApi.list()
        setDeployments(items)
      } catch (err) {
        setError(err.response?.data?.detail || 'Impossible de charger les notifications')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const notifications = useMemo(() => {
    return [...deployments]
      .sort((a, b) => {
        const dateA = new Date(a.updated_at || a.last_deployed_at || a.created_at).getTime()
        const dateB = new Date(b.updated_at || b.last_deployed_at || b.created_at).getTime()
        return dateB - dateA
      })
      .slice(0, 20)
      .map((deployment) => {
        const statusInfo = STATUS_TO_NOTIFICATION[deployment.status] || {
          title: 'Mise a jour du projet',
          type: 'info',
        }

        const description = deployment.error_message
          ? `${deployment.name}: ${deployment.error_message}`
          : `${deployment.name}: statut ${deployment.status}`

        return {
          id: deployment.id,
          title: statusInfo.title,
          description,
          type: statusInfo.type,
          date: deployment.updated_at || deployment.last_deployed_at || deployment.created_at,
        }
      })
  }, [deployments])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="h-7 w-7 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-700">Aucune notification pour le moment.</p>
          </Card>
        ) : (
          notifications.map((notif) => (
            <Card key={`${notif.id}-${notif.date}`} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900">{notif.title}</p>
                <p className="text-sm text-gray-600">{notif.description}</p>
                <p className="mt-1 text-xs text-gray-500">{formatDate(notif.date)}</p>
              </div>
              <Badge status={notif.type}>{notif.type.toUpperCase()}</Badge>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
