import { object, string, ObjectSchema } from 'joi';

export const userSchema: ObjectSchema = object({
  name: string()
    .min(2)
    .required(),
  mail: string()
    .email()
    .required(),
  password: string()
    .alphanum()
    .min(6)
    .max(15)
    .required(),
});
