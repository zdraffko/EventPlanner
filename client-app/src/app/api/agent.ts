import axios, { AxiosResponse, AxiosError } from "axios";
import IEvent, { IEventFormValues } from "../models/eventModel";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";
import { IUserLogInFormValues, IUser, IUserRegisterFormValues } from "../models/userModels";
import { tokenName } from "../stores/commonStore";

axios.defaults.baseURL = "https://localhost:44348/api";

axios.interceptors.request.use((config) => {
  var token = window.localStorage.getItem(tokenName);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.message === "Network Error" && !error.response) {
    browserHistory.push(NavConstants.NETWORK_ERROR);
    return;
  }

  const response = error.response;

  if (response?.status === 404) {
    browserHistory.push(NavConstants.NOT_FOUND_ERROR);
  } else if (
    response?.status === 400 &&
    response.config.method === "GET" &&
    response.data.errors.hasOwnProperty("id")
  ) {
    browserHistory.push(NavConstants.NOT_FOUND_ERROR);
  } else if (response?.status === 500) {
    browserHistory.push(NavConstants.SERVER_ERROR);
  }

  throw response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const events = {
  getAll: (): Promise<IEvent[]> => requests.get(NavConstants.EVENTS),
  getEvent: (id: string): Promise<IEvent> => requests.get(`${NavConstants.EVENTS}/${id}`),
  create: (event: IEventFormValues): Promise<string> => requests.post(NavConstants.EVENTS, event),
  update: (event: IEventFormValues) => requests.put(`${NavConstants.EVENTS}/${event.id}`, event),
  delete: (id: string) => requests.delete(`${NavConstants.EVENTS}/${id}`),
  attend: (id: string) => requests.post(`${NavConstants.EVENTS}/${id}/attendance`, {}),
  unAttend: (id: string) => requests.delete(`${NavConstants.EVENTS}/${id}/attendance`),
};

const users = {
  logIn: (loginInfo: IUserLogInFormValues): Promise<IUser> => requests.post(NavConstants.LOGIN, loginInfo),
  register: (registerInfo: IUserRegisterFormValues) => requests.post(NavConstants.REGISTER, registerInfo),
  getCurrentUser: (): Promise<IUser> => requests.get(NavConstants.ACCOUNT),
};

export default {
  events,
  users,
};
