
import request from 'supertest'
import { CompositionRoot } from '../../composition/compositionRoot';

describe('restfulAPI', () => {

  let compositionRoot = new CompositionRoot();
  let api = compositionRoot.getAPI();

  beforeAll(async () => {
    await api.start();
  })

  afterAll(async() => {
    await api.stop();
  })

  it('can check in on the health of the server', async () => {
    let response = await request(api.getInstance())
      .get('/health')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.ok).toEqual(true);
  });

})

// // 
// class UserBuilder {
//   public static create (db: any) {
//     // do work
//     return this;
//   }

//   public static withExistingUsers (users: any[]) { 
//     // do work
//     return this;
//   }

//   public static build () {
//     // finalize work

//   }
// }

// // Builder
// async function thereAreExistingUsers (users: []) {
//   // for each of these... 
//   // go straight to the database...
//   // set it up...
//   // return...
// }