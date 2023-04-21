import { DynamoDBClient, DynamoDBClientConfig, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Lifecycle, injectable, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@injectable()
export class DynamoService {
  private readonly client: DynamoDBClient;

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

  sendQueryCommand(queryCommand: QueryCommand) {
    return this.client.send(queryCommand);
  }

  sendPutItemCommand(putItemCommand: PutItemCommand) {
    return this.client.send(putItemCommand);
  }
}
