import { AxiosResponse } from 'axios';
import HttpClient from '../utils/HttpClient.ts'

export const getSymbolData = async (params: object): Promise<AxiosResponse> => {
  const httpClient: HttpClient = new HttpClient()
  const response = await httpClient.get('/query', params)

  return response
}
