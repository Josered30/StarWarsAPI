import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';

@injectable()
export class HttpClientService {
  public readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.STARWARS_API,
    });
  }
}
