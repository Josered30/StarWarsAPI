import 'reflect-metadata';

import { describe } from 'mocha';
import { expect } from 'chai';
import { createStubInstance, stub, SinonStubbedInstance, assert } from 'sinon';
import { v4 as uuid } from 'uuid';

import { PeopleIRepository } from '../../../src/domain/respositories/people.irespository';
import { PeopleRepository } from '../../../src/infrastructure/respositories/people.respository';
import { DynamoService } from '../../../src/infrastructure/services/dynamo.service';

describe('Person repository tests', () => {
  let dynamoService: SinonStubbedInstance<DynamoService>;
  let personRepository: PeopleIRepository;

  before(() => {

    dynamoService = createStubInstance(DynamoService);
    personRepository = new PeopleRepository(dynamoService);
  });

  it('Get null person from repository', () => {
    dynamoService.sendQueryCommand.restore();
    stub(dynamoService, 'sendQueryCommand').resolves({ Items: [], $metadata: {} });

    return personRepository.getPeopleById(0).then((person) => expect(person).to.equal(null));
  });

  it('Get person from repository', () => {
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

    return personRepository.getPeopleById(0).then((person) => expect(person).not.equal(null));
  });

  it('Create person in repository', () => {
    dynamoService.sendPutItemCommand.restore();
    stub(dynamoService, 'sendPutItemCommand').resolves({ $metadata: {} });

    return personRepository
      .savePeople({
        id: 0,
        uuid: uuid(),
        nombre: 'Leia Organa',
        nacimiento: '',
        colorOjos: 'brown',
        genero: 'female',
        colorCabello: 'brown',
        altura: '150',
        masa: '49',
        colorPiel: 'brown',
        mundoOrigen: 'https://swapi.py4e.com/api/planets/2/',
        url: 'https://swapi.py4e.com/api/people/5/',
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        especies: ['https://swapi.py4e.com/api/species/1/'],
        navesEspaciales: [],
        vehiculos: ['https://swapi.py4e.com/api/vehicles/30/'],
        peliculas: [
          'https://swapi.py4e.com/api/films/1/',
          'https://swapi.py4e.com/api/films/2/',
          'https://swapi.py4e.com/api/films/3/',
          'https://swapi.py4e.com/api/films/6/',
          'https://swapi.py4e.com/api/films/7/',
        ],
      })
      .then(() => assert.calledOnce(dynamoService.sendPutItemCommand));
  });
});
