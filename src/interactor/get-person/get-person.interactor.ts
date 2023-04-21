import { v4 as uuid } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { DependencyTokens } from '@infrastructure/dependency-injection/dependency-tokens';
import { StarWarsService } from '@infrastructure/api/services/starwars.service';

import { PeopleIRepository } from '@domain/respositories/people.irespository';
import { Person } from '@domain/models/person';

import { GetPersonInput } from './get-person.input';
import { GetPersonOutput } from './get-person.output';
import { GetPersonError } from './get-person.error';

@injectable()
export class GetPersonInteractor {
  constructor(
    @inject(DependencyTokens.PEOPLE_REPOSITORY) private readonly peopleRepository: PeopleIRepository,
    @inject(StarWarsService) private readonly starWarsService: StarWarsService,
  ) {}

  async handle(getPeopleInput: GetPersonInput): Promise<GetPersonOutput> {
    if (getPeopleInput.personId === null && getPeopleInput.personUuid === null) {
      throw new GetPersonError('PersonId and PersonUuid are null');
    }

    let person: Person | null = null;
    if (getPeopleInput.personId !== null) {
      person = await this.peopleRepository.getPeopleById(getPeopleInput.personId);
    } else if (getPeopleInput.personUuid !== null) {
      person = await this.peopleRepository.getPeopleByUuid(getPeopleInput.personUuid);
    }

    if (person) {
      return {
        id: person.id,
        uuid: person.uuid,
        nombre: person.nombre,
        nacimiento: person.nacimiento,
        colorOjos: person.colorOjos,
        genero: person.genero,
        colorCabello: person.colorCabello,
        altura: person.altura,
        masa: person.masa,
        colorPiel: person.colorPiel,
        mundoOrigen: person.mundoOrigen,
        url: person.url,
        fechaCreacion: person.fechaCreacion,
        fechaEdicion: person.fechaEdicion,
        especies: person.especies,
        navesEspaciales: person.navesEspaciales,
        vehiculos: person.vehiculos,
        peliculas: person.peliculas,
      };
    }

    if (getPeopleInput.personId === null) {
      throw new GetPeopleError('PersonId is null');
    }

    const getPeopleResponse = await this.starWarsService.getPerson(getPeopleInput.personId);
    const newPerson: Person = {
      id: getPeopleInput.personId || 0,
      uuid: uuid(),
      nombre: getPeopleResponse.name || '',
      nacimiento: getPeopleResponse.birth_day || '',
      colorOjos: getPeopleResponse.eye_color || '',
      genero: getPeopleResponse.gender || '',
      colorCabello: getPeopleResponse.hair_color || '',
      altura: getPeopleResponse.height || '',
      masa: getPeopleResponse.mass || '',
      colorPiel: getPeopleResponse.hair_color || '',
      mundoOrigen: getPeopleResponse.homeworld || '',
      url: getPeopleResponse.url || '',
      fechaCreacion: getPeopleResponse.created ? new Date(getPeopleResponse.created) : new Date(),
      fechaEdicion: getPeopleResponse.edited ? new Date(getPeopleResponse.edited) : new Date(),
      especies: getPeopleResponse.species || [],
      navesEspaciales: getPeopleResponse.starships || [],
      vehiculos: getPeopleResponse.vehicles || [],
      peliculas: getPeopleResponse.films || [],
    };

    console.log(newPerson);

    await this.peopleRepository.savePeople(newPerson);

    return {
      id: newPerson.id,
      uuid: newPerson.uuid,
      nombre: newPerson.nombre,
      nacimiento: newPerson.nacimiento,
      colorOjos: newPerson.colorOjos,
      genero: newPerson.genero,
      colorCabello: newPerson.colorCabello,
      altura: newPerson.altura,
      masa: newPerson.masa,
      colorPiel: newPerson.colorPiel,
      mundoOrigen: newPerson.mundoOrigen,
      url: newPerson.url,
      fechaCreacion: newPerson.fechaCreacion,
      fechaEdicion: newPerson.fechaEdicion,
      especies: newPerson.especies,
      navesEspaciales: newPerson.navesEspaciales,
      vehiculos: newPerson.vehiculos,
      peliculas: newPerson.peliculas,
    };
  }
}
