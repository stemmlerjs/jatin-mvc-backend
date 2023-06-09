import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const createUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(5).required(),
  age: Joi.number().required(),
});

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = createUserSchema.validate(req.body);

  if (!error) {
    return next();
  }

  return res.send({ ok: false, error: error?.message });
};
