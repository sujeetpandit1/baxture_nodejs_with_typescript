import cluster from 'cluster';
import os from 'os';
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

if (cluster.isPrimary) {
  const num_workers = os.cpus().length - 1;

  console.log(`Primary cluster setting up ${num_workers} workers...`);

  let ports: any = process.env.PORTS;

  for (let i = 0; i < num_workers; i++) {
    const port = ports[i];
    cluster.fork({ port })
      .on('error', (err) => {
        console.error(`Error while creating worker ${i}:`, err);
      });
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const app = require('./app');

  const server = createServer(app);

  const PORT = process.env.PORTS;

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}
