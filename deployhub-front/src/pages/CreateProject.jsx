import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import {
  ArrowLeft,
  Github,
  Upload,
  FileArchive,
  Rocket,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { deploymentsApi } from '../api/deployments'

const TABS = [
  { id: 'github', label: 'GitHub', icon: Github },
  { id: 'zip', label: 'Archive ZIP', icon: FileArchive },
]

function TagsInput({ value, onChange }) {
  const [draft, setDraft] = useState('')

  const addTag = () => {
    const t = draft.trim()
    if (t && !value.includes(t)) onChange([...value, t])
    setDraft('')
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-md"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== t))}
              className="hover:text-emerald-900"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              addTag()
            }
          }}
          placeholder="Ajouter un tag puis Entrée"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <Button type="button" variant="outline" size="sm" onClick={addTag}>
          Ajouter
        </Button>
      </div>
    </div>
  )
}

export default function CreateProject() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('github')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Common
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [envVars, setEnvVars] = useState('')

  // GitHub
  const [githubUrl, setGithubUrl] = useState('')
  const [branch, setBranch] = useState('main')

  // ZIP
  const [file, setFile] = useState(null)

  const parseEnv = () => {
    if (!envVars.trim()) return null
    try {
      const parsed = JSON.parse(envVars)
      if (typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error()
      return parsed
    } catch {
      throw new Error('Les variables d\'environnement doivent être un JSON valide (objet).')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('Le nom du projet est requis.')
      return
    }

    setSubmitting(true)
    try {
      const envObj = parseEnv()
      let deployment
      if (tab === 'github') {
        if (!githubUrl.trim()) throw new Error('L\'URL GitHub est requise.')
        deployment = await deploymentsApi.createGithub({
          name,
          description: description || null,
          tags,
          github_url: githubUrl,
          branch: branch || 'main',
          env_vars: envObj,
        })
      } else {
        if (!file) throw new Error('Veuillez sélectionner un fichier ZIP.')
        const fd = new FormData()
        fd.append('name', name)
        if (description) fd.append('description', description)
        if (tags.length) fd.append('tags', JSON.stringify(tags))
        if (envObj) fd.append('env_vars', JSON.stringify(envObj))
        fd.append('file', file)
        deployment = await deploymentsApi.createZip(fd)
      }
      navigate(`/projects/${deployment.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erreur lors de la création')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nouveau projet</h1>
        <p className="text-gray-600 mt-1">
          Déployez votre application en quelques clics depuis GitHub ou une archive ZIP.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                tab === id
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Input
            label="Nom du projet *"
            placeholder="Mon super projet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quelques mots sur votre projet..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <TagsInput value={tags} onChange={setTags} />

          {tab === 'github' ? (
            <>
              <Input
                icon={Github}
                label="URL du dépôt GitHub *"
                placeholder="https://github.com/user/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
              <Input
                label="Branche"
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archive ZIP *
              </label>
              <label
                htmlFor="zip-file"
                className="flex flex-col items-center justify-center gap-2 px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-700 font-medium">
                  {file ? file.name : 'Cliquez pour sélectionner un fichier ZIP'}
                </span>
                <span className="text-xs text-gray-500">
                  Doit contenir un Dockerfile à la racine
                </span>
                <input
                  id="zip-file"
                  type="file"
                  accept=".zip"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variables d'environnement (JSON)
            </label>
            <textarea
              value={envVars}
              onChange={(e) => setEnvVars(e.target.value)}
              placeholder='{"PORT": "8000", "API_KEY": "..."}'
              rows={3}
              className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Optionnel — exemple : <code>{'{"PORT":"8000"}'}</code>
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="ghost"
              as={Link}
              to="/dashboard"
              size="md"
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={submitting}>
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Rocket className="w-5 h-5" />
              )}
              {submitting ? 'Déploiement...' : 'Déployer'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
