import { useEffect, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import {
  ArrowLeft,
  ExternalLink,
  Play,
  Square,
  Trash2,
  RefreshCw,
  Hammer,
  Copy,
  Loader2,
  Github,
  FileArchive,
  AlertCircle,
  Tag as TagIcon,
  Terminal,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import { deploymentsApi } from '../api/deployments'

const POLL_INTERVAL = 4000
const IN_PROGRESS = ['pending', 'cloning', 'extracting', 'building', 'starting']

function ActionButton({ icon: Icon, label, onClick, variant = 'secondary', loading, disabled }) {
  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      onClick={onClick}
      disabled={loading || disabled}
      className="!px-4"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [builds, setBuilds] = useState([])
  const [logs, setLogs] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [logsError, setLogsError] = useState(null)
  const [logsLoading, setLogsLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  const loadLogs = useCallback(async () => {
    setLogsLoading(true)
    setLogsError(null)
    try {
      const data = await deploymentsApi.logs(id, 500)
      setLogs(typeof data?.logs === 'string' ? data.logs : '')
    } catch (err) {
      setLogs('')
      setLogsError(err.response?.data?.detail || 'Impossible de charger les logs')
    } finally {
      setLogsLoading(false)
    }
  }, [id])

  const load = useCallback(async () => {
    try {
      const [p, b] = await Promise.all([
        deploymentsApi.get(id),
        deploymentsApi.builds(id).catch(() => []),
      ])
      setProject(p)
      setBuilds(b)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.detail || 'Projet introuvable')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  // Polling tant qu'un build est en cours
  useEffect(() => {
    if (!project) return
    if (!IN_PROGRESS.includes(project.status)) return
    const t = setInterval(load, POLL_INTERVAL)
    return () => clearInterval(t)
  }, [project, load])

  const runAction = async (key, fn) => {
    setActionLoading(key)
    try {
      const updated = await fn()
      setProject(updated)
    } catch (err) {
      setError(err.response?.data?.detail || 'Action échouée')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Supprimer définitivement ce projet ? Cette action est irréversible.')) return
    setActionLoading('delete')
    try {
      await deploymentsApi.remove(id)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Suppression échouée')
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    )
  }

  if (error && !project) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-gray-700">{error}</p>
        <Button as={Link} to="/dashboard" variant="outline" className="mt-4">
          Retour
        </Button>
      </Card>
    )
  }

  const SourceIcon = project.source_type === 'github' ? Github : FileArchive
  const isWebApp = project.app_url?.startsWith('http')

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 break-words">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <StatusBadge status={project.status} />
              {project.app_type && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md uppercase tracking-wide">
                  {project.app_type}
                </span>
              )}
              <span className="text-xs text-gray-500">
                Créé le{' '}
                {new Date(project.created_at).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          {isWebApp && (
            <a
              href={project.app_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ouvrir l'app
            </a>
          )}
        </div>
      </div>

      {error && (
        <Card className="p-3 bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      {/* Actions */}
      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Gestion du deploiement
            </p>
            <div className="flex flex-wrap gap-2">
              <ActionButton
                icon={Play}
                label="Redémarrer"
                onClick={() => runAction('restart', () => deploymentsApi.restart(id))}
                loading={actionLoading === 'restart'}
                disabled={!project.container_id}
              />
              <ActionButton
                icon={Square}
                label="Arrêter"
                onClick={() => runAction('stop', () => deploymentsApi.stop(id))}
                loading={actionLoading === 'stop'}
                disabled={project.status === 'stopped'}
              />
              <ActionButton
                icon={Hammer}
                label="Reconstruire"
                onClick={() => runAction('rebuild', () => deploymentsApi.rebuild(id))}
                loading={actionLoading === 'rebuild'}
              />
              <ActionButton icon={RefreshCw} label="Rafraîchir" onClick={load} />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Gestion du projet
            </p>
            <div className="flex flex-wrap gap-2">
              {project.source_type === 'github' && (
                <ActionButton
                  icon={Copy}
                  label="Dupliquer"
                  onClick={() =>
                    runAction('duplicate', async () => {
                      const dup = await deploymentsApi.duplicate(id)
                      navigate(`/projects/${dup.id}`)
                      return project
                    })
                  }
                  loading={actionLoading === 'duplicate'}
                />
              )}
              <ActionButton
                icon={Trash2}
                label="Supprimer"
                variant="danger"
                onClick={handleDelete}
                loading={actionLoading === 'delete'}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Infos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">Informations</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Slug</dt>
              <dd className="font-mono text-gray-900 break-all">{project.slug}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Source</dt>
              <dd className="flex items-center gap-2 text-gray-900">
                <SourceIcon className="w-4 h-4" />
                {project.source_type === 'github' ? (
                  <a
                    href={project.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline break-all"
                  >
                    {project.source_url}
                  </a>
                ) : (
                  <span className="break-all">Archive ZIP</span>
                )}
              </dd>
            </div>
            {project.source_type === 'github' && (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Branche</dt>
                <dd className="font-mono text-gray-900">{project.branch || 'main'}</dd>
              </div>
            )}
            {project.app_url && (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">URL</dt>
                <dd className="text-gray-900 break-all">
                  {isWebApp ? (
                    <a
                      href={project.app_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      {project.app_url}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <Terminal className="w-3 h-3" /> CLI
                    </span>
                  )}
                </dd>
              </div>
            )}
            {project.container_id && (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Container</dt>
                <dd className="font-mono text-xs text-gray-700">
                  {project.container_id.slice(0, 12)}
                </dd>
              </div>
            )}
            {project.last_deployed_at && (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Dernier déploiement</dt>
                <dd className="text-gray-900">
                  {new Date(project.last_deployed_at).toLocaleString('fr-FR')}
                </dd>
              </div>
            )}
            {project.status === 'failed' && project.error_message && (
              <div className="pt-3 border-t border-gray-100">
                <dt className="text-red-600 font-medium mb-1">Erreur</dt>
                <dd className="text-sm text-red-700 bg-red-50 p-2 rounded font-mono break-all">
                  {project.error_message}
                </dd>
              </div>
            )}
          </dl>

          {project.description && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          )}

          {project.tags?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    <TagIcon className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Historique des déploiements</h2>
          {builds.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun build enregistré.</p>
          ) : (
            <ul className="divide-y divide-gray-100 -my-2">
              {builds.slice(0, 8).map((b) => (
                <li key={b.id} className="py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge status={b.status} />
                    <span className="text-xs text-gray-500">
                      {new Date(b.started_at).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {b.error_message && (
                    <p className="text-xs text-red-600 mt-1 truncate" title={b.error_message}>
                      {b.error_message}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-gray-900">Logs du deploiement</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadLogs}
            disabled={logsLoading}
          >
            {logsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Rafraichir les logs
          </Button>
        </div>

        {logsError && (
          <p className="mb-3 text-sm text-red-600">{logsError}</p>
        )}

        <pre className="max-h-96 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
          {logs?.trim() || 'Aucun log disponible pour le moment.'}
        </pre>
      </Card>
    </div>
  )
}
