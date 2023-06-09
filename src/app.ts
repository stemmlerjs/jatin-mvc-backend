import express from 'express';
import { userRoute } from './route/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/user', userRoute);

export default app;
