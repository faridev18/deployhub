import Badge from './Badge'

const STATUS_MAP = {
  running: { label: 'Running', status: 'success', dot: true },
  stopped: { label: 'Stopped', status: 'stopped', dot: true },
  pending: { label: 'Pending', status: 'building', dot: true },
  cloning: { label: 'Cloning', status: 'building', dot: true },
  extracting: { label: 'Extracting', status: 'building', dot: true },
  building: { label: 'Building', status: 'building', dot: true },
  starting: { label: 'Starting', status: 'building', dot: true },
  failed: { label: 'Failed', status: 'error', dot: true },
  success: { label: 'Success', status: 'success', dot: true },
}

export default function StatusBadge({ status, className = '' }) {
  const entry = STATUS_MAP[status] || { label: status || 'Unknown', status: 'default', dot: false }
  return (
    <Badge status={entry.status} showDot={entry.dot} className={className}>
      {entry.label}
    </Badge>
  )
}
