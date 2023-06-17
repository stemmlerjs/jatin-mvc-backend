import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { isValidObjectId } from 'mongoose';

const editUserSchema = Joi.object().keys({
  id: Joi.custom(isValidObjectId).required(),
  username: Joi.string(),
  age: Joi.number(),
  password: Joi.string(),
});

export const validateEditUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = editUserSchema.validate(req.body);

  if (!error) {
    return next();
  }

  return res.send({ ok: false, error: error?.message });
};
