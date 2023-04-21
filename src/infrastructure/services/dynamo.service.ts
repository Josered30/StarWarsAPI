import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { Lifecycle, injectable, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@injectable()
export class DynamoService {
  public readonly client: DynamoDBClient;

  constructor() {
    let config: DynamoDBClientConfig = {};
    if (process.env.NODE_ENV !== 'production') {
      config = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
    }
    this.client = new DynamoDBClient(config);
  }
}
