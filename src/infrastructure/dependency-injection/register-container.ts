import { Lifecycle, container } from 'tsyringe';

import { PeopleRepository } from '@infrastructure/respositories/people.respository';
import { DependencyTokens } from './dependency-tokens';

export function registerContainer() {
  container.register(
    DependencyTokens.PEOPLE_REPOSITORY,
    {
      useClass: PeopleRepository,
    },
    {
      lifecycle: Lifecycle.ResolutionScoped,
    },
  );
}
