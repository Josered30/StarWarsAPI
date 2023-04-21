import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { Person } from '@domain/models/person';
import { PeopleIRepository } from '@domain/respositories/people.irespository';

import { DependencyTokens } from '@infrastructure/dependency-injection/dependency-tokens';

import { CreatePersonInput } from './create-person.input';
import { CreatePersonOutput } from './create-person.output';

@injectable()
export class CreatePersonInteractor {
  constructor(@inject(DependencyTokens.PEOPLE_REPOSITORY) private readonly peopleRepository: PeopleIRepository) {}

  async handle(createPeopleInput: CreatePersonInput): Promise<CreatePersonOutput> {
    const newPerson: Person = {
      id: 0,
      uuid: uuid(),
      nombre: createPeopleInput.nombre,
      nacimiento: createPeopleInput.nacimiento,
      colorOjos: createPeopleInput.colorOjos,
      genero: createPeopleInput.genero,
      colorCabello: createPeopleInput.colorCabello,
      altura: createPeopleInput.altura,
      masa: createPeopleInput.masa,
      colorPiel: createPeopleInput.colorPiel,
      mundoOrigen: createPeopleInput.mundoOrigen,
      url: createPeopleInput.url,
      fechaCreacion: new Date(createPeopleInput.fechaCreacion),
      fechaEdicion: new Date(createPeopleInput.fechaEdicion),
      especies: createPeopleInput.especies,
      navesEspaciales: createPeopleInput.navesEspaciales,
      vehiculos: createPeopleInput.vehiculos,
      peliculas: createPeopleInput.peliculas,
    };

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
      fechaCreacion: new Date(newPerson.fechaCreacion),
      fechaEdicion: new Date(newPerson.fechaEdicion),
      especies: newPerson.especies,
      navesEspaciales: newPerson.navesEspaciales,
      vehiculos: newPerson.vehiculos,
      peliculas: newPerson.peliculas,
    };
  }
}
