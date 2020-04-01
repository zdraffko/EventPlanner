import axios, { AxiosResponse } from "axios";
import IEvent from "../models/eventModel";

axios.defaults.baseURL = "https://localhost:44348/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

const eventsUrl = "/events";
const events = {
  getAll: (): Promise<IEvent[]> => requests.get(eventsUrl),
  getEvent: (id: string) => requests.get(`${eventsUrl}/${id}`),
  create: (event: IEvent): Promise<string> => requests.post(eventsUrl, event),
  update: (event: IEvent) => requests.put(`${eventsUrl}/${event.id}`, event),
  delete: (id: string) => requests.delete(`${eventsUrl}/${id}`)
};

export default {
  events
};
