import { IUser } from "../../../shared/infra/database/model/user";



export type CreateUserInput = { username: string, password: string, age: string };

type SuccessfulResult = {
  success: true;
  data: IUser;
}

type FailureResult = {
  success: false;
  error: 'AlreadyCreated' | 'ValidationError' | 'Exception';
}

export type CreateUserResult = SuccessfulResult | FailureResult;

export interface UserServiceAPI {
  createUser (input: CreateUserInput): Promise<CreateUserResult>
}
