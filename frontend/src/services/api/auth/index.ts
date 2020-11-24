import axiosInstance from '../../../plugins/axios';
import { TResponseLogin, TResponseRegistration, TResponseMe } from './types';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegistrationParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const api = {
  login(params: ILoginParams) {
    return axiosInstance
      .post<TResponseLogin>('/users/login', params)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  },
  registration(params: IRegistrationParams) {
    return axiosInstance
      .post<TResponseRegistration>(`/users/registration`, params)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  },
  logout() {
    return axiosInstance
      .get(`/users/logout`)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  },
  me() {
    return axiosInstance
      .get<TResponseMe>(`/users/auth-by-token`)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  },
};

export { api as auth };
