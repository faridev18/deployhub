import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import {
  Search,
  Plus,
  Filter,
  Box,
  PlayCircle,
  StopCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Tag as TagIcon,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import StatusBadge from '../components/StatusBadge'
import { deploymentsApi } from '../api/deployments'

const STATUS_FILTERS = [
  { value: '', label: 'Tous' },
  { value: 'running', label: 'Running' },
  { value: 'building', label: 'Building' },
  { value: 'stopped', label: 'Stopped' },
  { value: 'failed', label: 'Failed' },
]

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </Card>
  )
}

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card hover className="p-5 h-full transition-transform hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {project.source_type === 'github' ? 'GitHub' : 'Archive'} · {project.slug}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
        )}

        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-md"
              >
                <TagIcon className="w-3 h-3" />
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span>
            {new Date(project.created_at).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          {project.app_url?.startsWith('http') && (
            <span className="flex items-center gap-1 text-emerald-600">
              <ExternalLink className="w-3 h-3" />
              {project.port}
            </span>
          )}
        </div>
      </Card>
    </Link>
  )
}

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [items, statsData] = await Promise.all([
        deploymentsApi.list({
          search: search || undefined,
          status: statusFilter || undefined,
          tag: tagFilter || undefined,
        }),
        deploymentsApi.stats(),
      ])
      setProjects(items)
      setStats(statsData)
    } catch (err) {
      setError(err.response?.data?.detail || 'Impossible de charger les projets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, tagFilter])

  const availableTags = useMemo(() => {
    const all = new Set()
    projects.forEach((p) => p.tags?.forEach((t) => all.add(t)))
    return Array.from(all).sort()
  }, [projects])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    loadData()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de tous vos déploiements
          </p>
        </div>
        <Button variant="primary" size="md" as={Link} to="/projects/new">
          <Plus className="w-5 h-5" />
          Nouveau projet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Box}
          label="Projets"
          value={stats?.total ?? '—'}
          color="bg-gray-100 text-gray-700"
        />
        <StatCard
          icon={PlayCircle}
          label="Running"
          value={stats?.running ?? '—'}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={Loader2}
          label="En cours"
          value={stats?.building ?? '—'}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          icon={AlertCircle}
          label="Échecs"
          value={stats?.failed ?? '—'}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <Input
              icon={Search}
              placeholder="Rechercher par nom ou description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {STATUS_FILTERS.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === s.value
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {availableTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Tags :</span>
            <button
              onClick={() => setTagFilter('')}
              className={`px-2 py-1 rounded text-xs font-medium ${
                !tagFilter ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tous
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  tagFilter === tag
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Projects */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center">
          <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun projet pour le moment
          </h3>
          <p className="text-gray-600 mb-6">
            Commencez par déployer votre première application Docker.
          </p>
          <Button variant="primary" as={Link} to="/projects/new">
            <Plus className="w-5 h-5" />
            Créer un projet
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
