import 'reflect-metadata';

import { describe } from 'mocha';
import { expect } from 'chai';
import { createStubInstance, stub, SinonStubbedInstance, spy, assert, SinonSpiedInstance } from 'sinon';

import { config } from 'dotenv';

import { PeopleIRepository } from '../../../src/domain/respositories/people.irespository';

import { PeopleRepository } from '../../../src/infrastructure/respositories/people.respository';
import { DynamoService } from '../../../src/infrastructure/services/dynamo.service';
import { HttpClientService } from '../../../src/infrastructure/services/http-client.service';

import { StarWarsService } from '../../../src/infrastructure/api/services/starwars.service';

import { GetPersonInteractor } from '../../../src/interactor/get-person';

describe('Get person interactor tests', () => {
  let dynamoService: SinonStubbedInstance<DynamoService>;

  let httpClientService: HttpClientService;
  let personRepository: PeopleIRepository;
  let getPersonInteractor: GetPersonInteractor;
  let starWarsService: StarWarsService;

  let starWarsServiceSpy: SinonSpiedInstance<StarWarsService>;
  let peopleRepositorySpy: SinonSpiedInstance<PeopleIRepository>;

  before(() => {
    config();
    dynamoService = createStubInstance(DynamoService);
    personRepository = new PeopleRepository(dynamoService);

    httpClientService = new HttpClientService();
    starWarsService = new StarWarsService(httpClientService);

    getPersonInteractor = new GetPersonInteractor(personRepository, starWarsService);

    starWarsServiceSpy = spy(starWarsService);
    peopleRepositorySpy = spy(personRepository);
  });

  beforeEach(() => {
    starWarsServiceSpy.getPerson.resetHistory();
    peopleRepositorySpy.getPeopleById.resetHistory();
    peopleRepositorySpy.getPeopleByUuid.resetHistory();
    peopleRepositorySpy.savePeople.resetHistory();
  });

  it('Get person from api', () => {
    dynamoService.sendQueryCommand.restore();
    stub(dynamoService, 'sendQueryCommand').resolves({ Items: [], $metadata: {} });

    return getPersonInteractor.handle({ personId: 1, personUuid: null }).then((person) => {
      expect(person).not.equal(null);
      assert.calledOnce(starWarsServiceSpy.getPerson);
    });
  });

  it('Get person from repository', async () => {
    dynamoService.sendQueryCommand.restore();
    stub(dynamoService, 'sendQueryCommand').resolves({
      Items: [
        {
          BirthYear: { S: '' },
          Films: { L: [] },
          CreatedAt: { N: '1418224809791' },
          Starships: { L: [] },
          Gender: { S: 'female' },
          HairColor: { S: 'brown' },
          UpdatedAt: { N: '1419110270315' },
          Url: { S: 'https://swapi.py4e.com/api/people/5/' },
          Name: { S: 'Leia Organa' },
          Vehicles: { L: [] },
          Mass: { S: '49' },
          EyeColor: { S: 'brown' },
          Uuid: { S: 'fab7a18b-acbb-42b6-8feb-310b3e1d9d43' },
          SkinColor: { S: 'brown' },
          HomeWorld: { S: 'https://swapi.py4e.com/api/planets/2/' },
          Height: { S: '150' },
          Id: { S: '5' },
          Species: { L: [] },
        },
      ],
      $metadata: {},
    });

    const person = await getPersonInteractor.handle({ personId: 1, personUuid: null });

    expect(person).not.equal(null);
    assert.notCalled(starWarsServiceSpy.getPerson);
    assert.calledOnce(peopleRepositorySpy.getPeopleById);
  });

  it('Person not found', () => {
    dynamoService.sendQueryCommand.restore();
    stub(dynamoService, 'sendQueryCommand').resolves({ Items: [], $metadata: {} });

    return getPersonInteractor
      .handle({ personId: 100, personUuid: null })
      .catch((error) => expect(error.toString()).to.equal('Error: Person not found'));
  });
});
