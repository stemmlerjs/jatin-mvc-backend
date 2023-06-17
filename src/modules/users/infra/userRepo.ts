
import { Maybe } from "../../../shared/core/maybe";
import { User } from "../domain/user";

export interface UserRepo {
  findByUsername (username: string): Promise<Maybe<User>>;
  save (user: User): Promise<void>;
}