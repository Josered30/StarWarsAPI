# Starwars Serverless 
## Installation/deployment instructions
### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

### Swagger

To set up the swagger documentation after deployment you must add the output url to the servers array in app.ts.

app.ts
```typescript
openapiJson.servers = [
  { url: 'http://localhost:3000/dev' },
  { url: 'https://qf3vdjyf3a.execute-api.us-east-1.amazonaws.com/prod' },
];
```