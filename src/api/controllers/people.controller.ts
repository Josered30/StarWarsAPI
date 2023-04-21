import { Request, Response } from 'express';

import { CreatePersonInteractor } from '@interactor/create-person';
import { GetPersonInteractor } from '@interactor/get-person';

import { container } from 'tsyringe';

export async function listPeople(req: Request, res: Response) {}

export async function getPerson(req: Request, res: Response) {
  const getPersonInteractor = container.resolve(GetPersonInteractor);

  const isNum = /^\d+$/.test(req.params.id);
  const personId = isNum ? Number.parseInt(req.params.id) : null;
  const personUuid = isNum ? null : req.params.id;

  try {
    const getPeopleOutput = await getPersonInteractor.handle({ personId, personUuid });
    res.json(getPeopleOutput).status(200);
  } catch (error) {
    res.json({ message: error.toString() }).status(400);
  }
}

export async function postPerson(req: Request, res: Response) {
  const createPersonInteractor = container.resolve(CreatePersonInteractor);

  try {
    const createPeopleOutput = await createPersonInteractor.handle(req.body);
    res.json(createPeopleOutput).status(201);
  } catch (error) {
    res.json({ message: error.toString() }).status(400);
  }
}
