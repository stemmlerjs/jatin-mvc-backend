import { AlreadyCreatedError } from '../../../shared/errors/alreadyCreatedError';
import { ValidationError } from '../../../shared/errors/validationError';
import { User } from '../domain/user';
import { UserRepo } from '../infra/userRepo';
import {
  CreateUserInput,
  CreateUserResult,
  UserServiceAPI,
} from './usersServiceAPI';

export class UserService implements UserServiceAPI {
  constructor(private userRepo: UserRepo) {}

  async createUser(input: CreateUserInput): Promise<CreateUserResult> {
    const { username } = input;

    // check if user already exists
    try {
      const alreadyCreatedUser = await this.userRepo.findByUsername(username);

      if (alreadyCreatedUser) {
        return {
          success: false,
          error: new AlreadyCreatedError(),
        };
      }

      // Validation logic happens in here
      let userOrError = User.create({
        ...input,
        id: uuid()
      });

      if (userOrError instanceof ValidationError) {
        return {
          success: false,
          error: userOrError,
        };
      }

      let newUser = userOrError;

      await this.userRepo.save(newUser);

      return {
        success: true,
        data: newUser,
      };
    } catch (error: any) {
      return {
        success: false,
        error: new Error(error),
      };
    }
  }
}
