import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

import { Person } from '@domain/models/person';
import { PeopleIRepository } from '@domain/respositories/people.irespository';

import { DynamoService } from '@infrastructure/services/dynamo.service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PeopleRepository implements PeopleIRepository {
  constructor(@inject(DynamoService) private readonly dynamoService: DynamoService) {}

  async getPeopleByUuid(personUuid: string): Promise<Person | null> {
    const queryCommand = new QueryCommand({
      TableName: 'StarWarsPeople',
      KeyConditionExpression: '#Uuid = :personUuid',
      ExpressionAttributeValues: {
        ':personUuid': {
          S: personUuid,
        },
      },
      ExpressionAttributeNames: {
        '#Uuid': 'Uuid',
      },
      ScanIndexForward: false,
    });

    const queryCommandOutput = await this.dynamoService.client.send(queryCommand);

    if (!queryCommandOutput.Items || queryCommandOutput.Items.length === 0) {
      return null;
    }

    const people: Person[] = queryCommandOutput.Items.map((item) => ({
      id: item.Id.S ? Number.parseInt(item.Id.S) : 0,
      uuid: item.Uuid.S || '',
      nombre: item.Name.S || '',
      nacimiento: item.BirthYear.S || '',
      colorOjos: item.EyeColor.S || '',
      genero: item.Gender.S || '',
      colorCabello: item.HairColor.S || '',
      altura: item.Height.S || '',
      masa: item.Mass.S || '',
      colorPiel: item.SkinColor.S || '',
      mundoOrigen: item.HomeWorld.S || '',
      url: item.Url.S || '',
      fechaCreacion: item.CreatedAt.N ? new Date(Number.parseInt(item.CreatedAt.N)) : new Date(),
      fechaEdicion: item.UpdatedAt.N ? new Date(Number.parseInt(item.UpdatedAt.N)) : new Date(),
      especies: item.Species.L ? item.Species.L.map((specie) => specie.S || '') : [],
      navesEspaciales: item.Starships.L ? item.Starships.L.map((starship) => starship.S || '') : [],
      vehiculos: item.Vehicles.L ? item.Vehicles.L.map((vehicle) => vehicle.S || '') : [],
      peliculas: item.Films.L ? item.Films.L.map((films) => films.S || '') : [],
    }));

    return people[0];
  }

  async getPeopleById(personId: number) {
    const queryCommand = new QueryCommand({
      TableName: 'StarWarsPeople',
      IndexName: 'IdIndex',
      KeyConditionExpression: 'Id = :personId',
      ExpressionAttributeValues: {
        ':personId': {
          S: personId.toString(),
        },
      },
      ScanIndexForward: false,
    });

    const queryCommandOutput = await this.dynamoService.client.send(queryCommand);

    console.log(queryCommandOutput.Items);

    if (!queryCommandOutput.Items || queryCommandOutput.Items.length === 0) {
      return null;
    }

    const people: Person[] = queryCommandOutput.Items.map((item) => ({
      id: item.Id.S ? Number.parseInt(item.Id.S) : 0,
      uuid: item.Uuid.S || '',
      nombre: item.Name.S || '',
      nacimiento: item.BirthYear.S || '',
      colorOjos: item.EyeColor.S || '',
      genero: item.Gender.S || '',
      colorCabello: item.HairColor.S || '',
      altura: item.Height.S || '',
      masa: item.Mass.S || '',
      colorPiel: item.SkinColor.S || '',
      mundoOrigen: item.HomeWorld.S || '',
      url: item.Url.S || '',
      fechaCreacion: item.CreatedAt.N ? new Date(Number.parseInt(item.CreatedAt.N)) : new Date(),
      fechaEdicion: item.UpdatedAt.N ? new Date(Number.parseInt(item.UpdatedAt.N)) : new Date(),
      especies: item.Species.L ? item.Species.L.map((specie) => specie.S || '') : [],
      navesEspaciales: item.Starships.L ? item.Starships.L.map((starship) => starship.S || '') : [],
      vehiculos: item.Vehicles.L ? item.Vehicles.L.map((vehicle) => vehicle.S || '') : [],
      peliculas: item.Films.L ? item.Films.L.map((films) => films.S || '') : [],
    }));

    return people[0];
  }

  async savePeople(person: Person): Promise<void> {
    console.log(person.id.toString());

    const putItemsCommand = new PutItemCommand({
      TableName: 'StarWarsPeople',
      Item: {
        Id: {
          S: person.id.toString(),
        },
        Uuid: {
          S: person.uuid,
        },
        Name: {
          S: person.nombre,
        },
        BirthYear: {
          S: person.nacimiento,
        },
        EyeColor: {
          S: person.colorOjos,
        },
        Gender: {
          S: person.genero,
        },
        HairColor: {
          S: person.colorCabello,
        },
        Height: {
          S: person.altura,
        },
        Mass: {
          S: person.masa,
        },
        SkinColor: {
          S: person.colorPiel,
        },
        HomeWorld: {
          S: person.mundoOrigen,
        },
        Url: {
          S: person.url,
        },
        CreatedAt: {
          N: person.fechaCreacion.getTime().toString(),
        },
        UpdatedAt: {
          N: person.fechaEdicion.getTime().toString(),
        },
        Species: {
          L: person.especies.map((specie) => ({ S: specie })),
        },
        Starships: {
          L: person.navesEspaciales.map((starships) => ({ S: starships })),
        },
        Vehicles: {
          L: person.vehiculos.map((vehicle) => ({ S: vehicle })),
        },
        Films: {
          L: person.peliculas.map((film) => ({ S: film })),
        },
      },
    });

    await this.dynamoService.client.send(putItemsCommand);
  }
}
