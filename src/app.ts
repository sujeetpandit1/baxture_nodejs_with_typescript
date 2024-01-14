import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import body_parser from 'body-parser';
import dotenv from 'dotenv';
import user_routes from './routes/user_routes';

dotenv.config();

const app = express();

app.use(body_parser.json());
app.use('/api', user_routes);

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({message: 'Invalid JSON' });
  } else {
    next();
  }
});

app.use((err: ErrorRequestHandler, _: Request, res: Response, __: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// app.use('*', (_: Request, res: Response) => {
//   res.status(404).json({ message: "Requested URL not Available" });
// });

app.all("/**", (_req, res) => {
  res.status(404).json({message: "Requested URL not Available" });
});

// Log that the server is running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
 