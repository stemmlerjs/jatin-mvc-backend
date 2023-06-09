
import request from 'supertest'
import { Server } from './server';

describe('e2e', () => {
  describe('health check', () => {

    let server: Server;

    beforeAll(async () => {
      await server.start();
    })

    afterAll(async() => {
      await server.stop();
    })

    it('can check in on the health of the server', async () => {
      let response = await request(server.getExpressInstance())
        .get('/health')
        .set('Accept', 'application/json');

      expect(response.headers["Content-Type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body.email).toEqual('foo@bar.com');

    })
  })
})