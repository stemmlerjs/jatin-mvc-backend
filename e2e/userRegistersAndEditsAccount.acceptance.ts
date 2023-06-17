
import request from 'supertest'
import { CompositionRoot } from '../src/shared/composition/compositionRoot'


describe('user registers and edits account', () => {

  let compositionRoot = new CompositionRoot();

  let driver = compositionRoot.getWebTestDriver();

  beforeAll(async () => {
    await driver.start();
  })

  afterAll(async() => {
    await driver.stop();
  })

  describe('users', () => {

    let user = { 
      username: 'khalilstemmler', 
      password: '12345', 
      age: '28' 
    };

    describe('creating a user', () => {

      it ('can create a user', async () => {

        let response = await request(driver.getAPIInstance())
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

        expect(response.status).toEqual(201);
        expect(response.body.data.username).toEqual(user.username);
        expect(response.body.data.password).toBeDefined();
        expect(response.body.data.age).toEqual(user.age);
      })
    })
  })
})
