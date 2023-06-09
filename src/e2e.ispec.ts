
import request from 'supertest'
import { TestHarness } from './testHarness';
import server from './app';
import { MongoDB } from './mongoDB';
import { config } from './config'

describe('e2e', () => {

  // let server = new Server();
  let mongo = new MongoDB({ mongoUrl: config.mongoUrl });
  let testHarness: TestHarness = new TestHarness(server, mongo, {
    port: config.port
  })

  beforeAll(async () => {
    await testHarness.start();
  })

  afterAll(async() => {
    await testHarness.stop();
  })

  describe('users', () => {

    describe('creating a user', () => {

      it ('can create a user', async () => {
        let response = await request(testHarness.getHttp())
        .post('/user')
        .send({ username: 'khalilstemmler', password: '12345', age: 28 })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        expect(response.status).toEqual(201);
        expect(response.body.ok).toEqual(true);
      })

    })

    // describe('editing a user', () => {

    // })

  })

  describe('health check', () => {

    it('can check in on the health of the server', async () => {
      let response = await request(testHarness.getHttp())
        .get('/health')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.ok).toEqual(true);
    });

  })
})