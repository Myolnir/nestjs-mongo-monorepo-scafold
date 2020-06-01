export const loadEnvConfig = (service: string, environment: string) => {
  let envPath: string = `${process.env.PWD}${environment === 'production' ? `/dist/apps/${service}/.env` : `/apps/${service}/.env`}`;

  if (environment === 'test') {
    envPath = envPath.replace('.env', 'test.env');
  }

  // eslint-disable-next-line global-require
  require('dotenv').config({ path: envPath });
};
