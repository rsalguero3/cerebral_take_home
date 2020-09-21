import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import Url from '../constant/Url';

const TIMEOUT = 5000;

class RequestDispatch {
  public service: AxiosInstance;

  private requestStartTime: number;

  constructor() {
    this.service = axios.create({
      baseURL: Url.ONBOARDING_QUESTIONS(),
      timeout: TIMEOUT,
      headers: {
        'User-Agent': Platform.OS,
      },
    });
    this.requestStartTime = 0;

    // Custom response interceptor
    this.service.interceptors.response.use(
      (response: any) => {
        console.log('✅ ', response.config.url, '\n', response);
        return response;
      },
      (err: any) => {
        console.log('❌ ', err.config.url, err.config, err.response);
        const message = err.message.toLowerCase();
        if (!err.response) {
          // The site can’t be reached, server IP address could not be found.
          console.log(message);
        } else if (err.response.status === 500) {
          // Request failed with status code 500, Internal Server Error
        } else if (err.response.status === 415) {
          // Request failed with status code 415, Unsupported Media Type
        } else if (err.response.status === 409) {
          // Request failed with status code 409, Conflict
        } else if (err.response.status === 404) {
          // Request failed with status code 404, Not Found
        } else if (err.response.status === 403) {
          // Request failed with status code 403, Forbidden
        } else if (err.response.status === 401) {
          // Request failed with status code 401, Unauthorized
          console.log(err.response.data.reason);
        } else if (err.response.status === 400) {
          // Request failed with status code 400, Bad Request
        }
        return Promise.reject(err);
      },
    );
  }

  axiosPromise(config: AxiosRequestConfig) {
    return this.service(config);
  }
}

class Request {
  private static instance?: Request;

  public dispatch: RequestDispatch;

  constructor() {
    this.dispatch = new RequestDispatch();
  }

  static getInstance() {
    if (!Request.instance) {
      Request.instance = new Request();
    }
    return Request.instance;
  }

  enqueue(config: AxiosRequestConfig) {
    return this.dispatch.axiosPromise(config);
  }
}

export default Request.getInstance();
