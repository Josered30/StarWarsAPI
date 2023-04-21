import { HttpClientService } from '@infrastructure/services/http-client.service';
import { GetPeopleResponse } from '../resources/response/get-people.response';

import { inject, injectable } from 'tsyringe';

@injectable()
export class StarWarsService {
  constructor(@inject(HttpClientService) private readonly httpClientService: HttpClientService) {}

  getPerson(personId: number) {
    return this.httpClientService.client.get<GetPeopleResponse>(`people/${personId}`).then((response) => response.data);
  }
}
