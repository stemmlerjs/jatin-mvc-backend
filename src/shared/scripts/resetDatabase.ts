
import { MongoDBConnection } from "../infra/database/mongoDBConnection";

export async function resetDatabase (mongo: MongoDBConnection) {
  await mongo.getInstance().connection.dropDatabase()
}