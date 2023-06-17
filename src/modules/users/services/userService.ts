

import { IUser, User } from "../../../shared/infra/database/model/user";
import { CreateUserInput, CreateUserResult, UserServiceAPI } from "./usersServiceAPI";

export class UserService implements UserServiceAPI {

  async createUser (input: CreateUserInput): Promise<CreateUserResult> {
    const { username, password, age } = input;

    // check if user already exists
    try {
      const alreadyCreatedUser: IUser | null = await User.findOne({ username });

      if (alreadyCreatedUser) {
        return {
          success: false,
          error: 'AlreadyCreated'
        };
      }

      const newUser: IUser = await User.create({ username, password, age });
      
      return {
        success: true,
        data: newUser
      }

    } catch (error: any) {
      return {
        success: false,
        error: 'Exception'
      };
    }
  }

}

