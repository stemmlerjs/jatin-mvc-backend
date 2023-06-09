
import request from 'supertest'
import { Server } from './server';
import app from './app';


describe('e2e', () => {
  describe('health check', () => {

    let server: Server = new Server(app, {
      port: 3000,
    })

    beforeAll(async () => {
      await server.start();
    })

    afterAll(async() => {
      await server.stop();
    })

    it('can check in on the health of the server', async () => {
      let response = await request(server.getHttp())
        .get('/health')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.ok).toEqual(true);

    })
  })
})