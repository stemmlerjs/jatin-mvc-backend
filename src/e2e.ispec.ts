
import request from 'supertest'
import { TestHarness } from './testHarness';
import server from './app';
import { MongoDB } from './mongoDB';
import { config } from './config'

describe('e2e', () => {
  describe('health check', () => {

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

    it('can check in on the health of the server', async () => {
      let response = await request(testHarness.getHttp())
        .get('/health')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.ok).toEqual(true);
    });

  })
})