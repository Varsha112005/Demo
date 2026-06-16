import { API_ENDPOINTS } from '../constants/api'
import apiClient from './apiClient'

export const authService = {
  login: (payload) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload),
  register: (payload) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload),
  verifyLoginOtp: (payload) => apiClient.post(API_ENDPOINTS.AUTH.VERIFY_LOGIN_OTP, payload),
  verifyRegisterOtp: (payload) => apiClient.post(API_ENDPOINTS.AUTH.VERIFY_REGISTER_OTP, payload),
  getCurrentUser: () => apiClient.get(API_ENDPOINTS.AUTH.PROFILE),
}
