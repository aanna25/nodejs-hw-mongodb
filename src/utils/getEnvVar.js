import 'dotenv/config';

export const getEnvVar = (name, defaulValue) => {
  const value = process.env[name];
  if (value) return value;
  if (!value && defaulValue) return defaulValue;
  throw new Error(`Cannot find ${name} environment variables`);
};
