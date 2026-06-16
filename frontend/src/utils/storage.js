import { tokenStorage } from './tokenStorage'

export const storage = {
  getToken: tokenStorage.getToken,
  setToken: tokenStorage.setToken,
  removeToken: tokenStorage.removeToken,
}
