import { Person } from '@domain/models/person';

export interface PeopleIRepository {
  getPeopleById(personId: number): Promise<Person | null>;
  getPeopleByUuid(personUuid: string): Promise<Person | null>;
  savePeople(person: Person): Promise<void>;
}
