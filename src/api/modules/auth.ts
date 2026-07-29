import service from '~/api/index'
import { AUTH } from '~/types/auth'

const baseURL = '/auth'

export const $AuthApi = {
  login: (data: AUTH.LoginInfo) => service.post(`${baseURL}/login`, data),
  getInfo: () => service.get(`${baseURL}/info`)
}
