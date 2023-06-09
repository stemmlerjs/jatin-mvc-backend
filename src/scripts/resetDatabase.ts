import { MongoDB } from "../mongoDB";


export async function resetDatabase (mongo: MongoDB) {
  await mongo.getInstance().connection.dropDatabase()
}