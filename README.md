# Starwars Serverless 
## Installation/deployment instructions
### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

### Enviroment variables
Set up the next variables in a .env file in the root of the proyect.

.env
```
STARWARS_API="https://swapi.py4e.com/api/"
NODE_ENV="production"
```

### Swagger

To set up the swagger documentation after deployment you must add the output url to the servers array in app.ts.

"sls deploy" console output
```sh
Deploying starwars-api to stage prod (us-east-1)

✔ Service deployed to stack starwars-api-prod (70s)

endpoints:
  ANY - https://qf3vdjyf3a.execute-api.us-east-1.amazonaws.com/prod/
  ANY - https://qf3vdjyf3a.execute-api.us-east-1.amazonaws.com/prod/{proxy+}
functions:
  app: starwars-api-prod-app (5.4 MB)

```

app.ts
```typescript
openapiJson.servers = [
  { url: 'http://localhost:3000/dev' },
  { url: 'https://qf3vdjyf3a.execute-api.us-east-1.amazonaws.com/prod' },
];
```