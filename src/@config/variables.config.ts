import * as joi from 'joi';

export const EnvConfig = {
  envFilePath: [`.env.dev`],
  isGlobal: true,
  validationSchema: joi.object({
    PORT: joi.number().required(),
    NODE_ENV: joi.string().valid('dev', 'sandbox', 'production', 'test'),
    DATABASE_URL: joi.string().required(),
  }),
};

export const Variables = {};
