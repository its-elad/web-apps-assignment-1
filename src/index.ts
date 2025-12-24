import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRouter from './routers/postRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI ?? "")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/post', postRouter);

app.get('/api', (req: Request, res: Response) => {
  res.send('Welcome to the webapp API');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the webapp API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
