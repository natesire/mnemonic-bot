"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
var worker = new worker_threads_1.Worker('./worker.js', {
    workerData: {
        value: 15,
        path: './worker.js'
    }
});
worker.on('message', function (result) {
    console.log(result);
});

