import serverlessExpress from '@vendia/serverless-express';
import bootstrap from '../src/bootstrap';

let server: any;

export default async function handler(req: any, res: any) {
  if (!server) {
    const expressApp = await bootstrap();
    server = serverlessExpress({ app: expressApp });
  }
  return server(req, res);
}