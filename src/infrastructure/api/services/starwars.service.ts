import { HttpClientService } from '@infrastructure/services/http-client.service';
import { GetPeopleResponse } from '../resources/response/get-people.response';

import { inject, injectable } from 'tsyringe';

@injectable()
export class StarWarsService {
  constructor(@inject(HttpClientService) private readonly httpClientService: HttpClientService) {}

  async getPerson(personId: number): Promise<GetPeopleResponse | null> {
    try {
      const response = await this.httpClientService.client.get<GetPeopleResponse>(`people/${personId}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
