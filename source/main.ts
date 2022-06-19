import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';


const worker = new Worker('./worker.js', {
  workerData: {
    value: 15,
    path: './worker.js'
  }
});
 
worker.on('message', (result) => {
  console.log(result);
});

worker.error('message', (result) => {
  console.log(result);
});