import apiClient from './client'

export const deploymentsApi = {
  list: (params = {}) =>
    apiClient.get('/deployments/', { params }).then((r) => r.data),
  stats: () => apiClient.get('/deployments/stats').then((r) => r.data),
  get: (id) => apiClient.get(`/deployments/${id}`).then((r) => r.data),
  builds: (id) => apiClient.get(`/deployments/${id}/builds`).then((r) => r.data),
  logs: (id, tail = 500) =>
    apiClient.get(`/deployments/${id}/logs`, { params: { tail } }).then((r) => r.data),

  createGithub: (data) =>
    apiClient.post('/deployments/github', data).then((r) => r.data),

  createZip: (formData) =>
    apiClient
      .post('/deployments/zip', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  update: (id, data) =>
    apiClient.patch(`/deployments/${id}`, data).then((r) => r.data),
  remove: (id) => apiClient.delete(`/deployments/${id}`).then((r) => r.data),

  stop: (id) => apiClient.post(`/deployments/${id}/stop`).then((r) => r.data),
  restart: (id) =>
    apiClient.post(`/deployments/${id}/restart`).then((r) => r.data),
  rebuild: (id) =>
    apiClient.post(`/deployments/${id}/rebuild`).then((r) => r.data),
  duplicate: (id) =>
    apiClient.post(`/deployments/${id}/duplicate`).then((r) => r.data),
}
