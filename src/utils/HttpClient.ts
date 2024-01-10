import axios, { Axios, AxiosResponse } from 'axios';

interface HttpClientInterface {
  axiosInstance: Axios,
  get: Function
}

/**
 * Utility class for HTTP client
 */
class HttpClient implements HttpClientInterface {
  axiosInstance: Axios;

  constructor () {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 30000
    })
  }

  async get (path: string, params: object): Promise<AxiosResponse> {
    const instance: Axios = this.axiosInstance
    return await instance.get(path, { params })
  }
}

export default HttpClient
