// queue
const Queue = require('bee-queue');
const msgsQueue = new Queue('messages');

// express server
const express = require('express')
const app = express()

var cont = 0

app.get('/new', (req,res)=>{

    msgsQueue.createJob({cont}).save(function () {
        console.log('Message added into queue.');
        cont++
    });

    res.send('new action')
})

var lastMarkDone = []

app.get('/did', (req,res)=>{
    try {
        lastMarkDone()
        res.send('last did')
    }catch(e) {
        res.send('no more tasks')
    }
})


msgsQueue.process(function (job, done) {
    console.log('New message into queue', job.data);
    lastMarkDone = done
});

app.listen(8111,()=>{console.log('server is running...')})