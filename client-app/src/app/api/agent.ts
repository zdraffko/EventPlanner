import axios, { AxiosResponse, AxiosError } from "axios";
import IEvent from "../models/eventModel";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";

axios.defaults.baseURL = "https://localhost:44348/api";

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
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const eventsUrl = "/events";
const events = {
  getAll: (): Promise<IEvent[]> => requests.get(eventsUrl),
  getEvent: (id: string): Promise<IEvent> => requests.get(`${eventsUrl}/${id}`),
  create: (event: IEvent): Promise<string> => requests.post(eventsUrl, event),
  update: (event: IEvent) => requests.put(`${eventsUrl}/${event.id}`, event),
  delete: (id: string) => requests.delete(`${eventsUrl}/${id}`),
};

export default {
  events,
};
