import apiClient from './client'

export const authApi = {
  register: (data) => apiClient.post('/auth/register', data).then((r) => r.data),
  login: (data) => apiClient.post('/auth/login', data).then((r) => r.data),
  me: () => apiClient.get('/auth/me').then((r) => r.data),
  confirmEmail: (token) =>
    apiClient.post('/auth/confirm-email', null, { params: { token } }).then((r) => r.data),
  forgotPassword: (email) =>
    apiClient.post('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (token, newPassword) =>
    apiClient
      .post('/auth/reset-password', { token, new_password: newPassword })
      .then((r) => r.data),
}
