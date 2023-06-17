
import { Maybe } from '../../../shared/core/maybe';
import { IUser } from '../../../shared/infra/database/models/user';
import { MongoDBConnection } from '../../../shared/infra/database/mongoDBConnection';
import { User } from '../domain/user';
import { UserRepo } from './userRepo';

export class MongoUserRepo implements UserRepo {

  constructor(private conn: MongoDBConnection) {}

  async findByUsername(username: string): Promise<Maybe<User>> {
    let { userModel } = this.conn.getModels();

    const alreadyCreatedUser: IUser | null = await userModel.findOne({ username });

    if (alreadyCreatedUser) {
      return User.toDomainFromMongo(alreadyCreatedUser);
    }

    return undefined;
  }

  async save(user: User): Promise<void> {
    let { userModel } = this.conn.getModels();

    
  }
}
