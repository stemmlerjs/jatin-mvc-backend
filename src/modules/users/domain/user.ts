
import { ValidationError } from '../../../shared/errors/validationError';
import { IUser } from '../../../shared/infra/database/models/user';
import { Age } from './age';
import { Id } from './id';
import { Password } from './password';
import { Username } from './username';

interface UserInputProps {
  id: string;
  username: string;
  password: string;
  age: string;
}

interface UserState {
  id: Id;
  username: Username;
  password: Password;
  age: Age;
}

export class User {

  private state: UserState;

  constructor (state: UserState) {
    this.state = state;
  }

  public static create(input: UserInputProps): User | ValidationError {
    return new ValidationError('this aint right');
    //return new User();
  }

  public static toDomainFromMongo (mongoUser: IUser): User {
    // Mapping happens here.

    let id = new Id();
    let username = new Username();
    let password = new Password();
    let age = new Age();
    

    return new User({
      id, username, password, age
    })
  }
}
