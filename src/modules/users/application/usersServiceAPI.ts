
import { AlreadyCreatedError } from "../../../shared/errors/alreadyCreatedError";
import { ValidationError } from "../../../shared/errors/validationError";
import { User } from "../domain/user";

export type CreateUserInput = { username: string, password: string, age: string };

type SuccessfulResult = {
  success: true;
  data: User;
}

type FailureResult = {
  success: false;
  error: AlreadyCreatedError | ValidationError | Error;
}

export type CreateUserResult = SuccessfulResult | FailureResult;

export interface UserServiceAPI {
  createUser (input: CreateUserInput): Promise<CreateUserResult>
}
