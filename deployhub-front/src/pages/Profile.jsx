import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { Settings, LogOut, Clock, Cpu, Database, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { deploymentsApi } from '../api/deployments'

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

function statusToLabel(status) {
  if (status === 'running') return 'Succes'
  if (status === 'failed') return 'Echec'
  if (status === 'building') return 'En cours'
  return status || 'Inconnu'
}

function statusToBadge(status) {
  if (status === 'running') return 'success'
  if (status === 'failed') return 'error'
  if (status === 'building') return 'info'
  return 'default'
}

export default function Profile() {
  const { user, logout } = useAuth()
  const [deployments, setDeployments] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [items, statsData] = await Promise.all([deploymentsApi.list(), deploymentsApi.stats()])
        setDeployments(items)
        setStats(statsData)
      } catch (err) {
        setError(err.response?.data?.detail || 'Impossible de charger le profil')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const history = useMemo(() => {
    return [...deployments]
      .sort((a, b) => {
        const dateA = new Date(a.last_deployed_at || a.updated_at || a.created_at).getTime()
        const dateB = new Date(b.last_deployed_at || b.updated_at || b.created_at).getTime()
        return dateB - dateA
      })
      .slice(0, 8)
      .map((item) => ({
        id: item.id,
        app: item.name,
        status: item.status,
        date: item.last_deployed_at || item.updated_at || item.created_at,
      }))
  }, [deployments])

  const quotas = [
    { icon: Cpu, label: 'Projets en execution', value: `${stats?.running ?? 0}/${stats?.total ?? 0}` },
    { icon: Database, label: 'Builds en cours', value: `${stats?.building ?? 0}` },
    { icon: Clock, label: 'Deployments en echec', value: `${stats?.failed ?? 0}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <Card className="p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">{user?.username || 'Utilisateur'}</h1>
              <p className="text-gray-600">{user?.email || '-'}</p>
              <div className="mt-2 flex gap-2">
                <Badge status={user?.is_verified ? 'success' : 'warning'}>
                  {user?.is_verified ? 'Email verifie' : 'Email non verifie'}
                </Badge>
                {user?.is_admin && <Badge status="info">Admin</Badge>}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" as={Link} to="/dashboard">
                <Settings className="mr-1 h-4 w-4" />
                Tableau de bord
              </Button>
            </div>
          </div>
        </Card>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {quotas.map((quota) => {
                const Icon = quota.icon
                return (
                  <Card key={quota.label} className="p-6 text-center">
                    <div className="mb-3 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{quota.value}</div>
                    <div className="text-sm text-gray-600">{quota.label}</div>
                  </Card>
                )
              })}
            </div>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Historique des deployments</h2>
              {history.length === 0 ? (
                <p className="text-sm text-gray-600">Aucun deploiement enregistre pour le moment.</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.app}</p>
                        <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                      </div>
                      <Badge status={statusToBadge(item.status)}>{statusToLabel(item.status)}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={logout}>
            <LogOut className="mr-2 h-5 w-5" />
            Se deconnecter
          </Button>
        </div>
      </div>
    </div>
  )
}
