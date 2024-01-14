"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (cluster_1.default.isPrimary) {
    const num_workers = os_1.default.cpus().length - 1;
    console.log(`Primary cluster setting up ${num_workers} workers...`);
    let ports = process.env.PORTS;
    for (let i = 0; i < num_workers; i++) {
        const port = ports[i];
        cluster_1.default.fork({ port })
            .on('error', (err) => {
            console.error(`Error while creating worker ${i}:`, err);
        });
    }
    cluster_1.default.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        console.log('Starting a new worker');
        cluster_1.default.fork();
    });
}
else {
    const app = require('./app');
    const server = (0, http_1.createServer)(app);
    const PORT = process.env.PORTS;
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} is running on port ${PORT}`);
    });
}
//# sourceMappingURL=load_balancer.js.map