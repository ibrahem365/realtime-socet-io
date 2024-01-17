const express = require('express');

const http = require('http');

const { join } = require('path');

const app = express();

const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);

        io.emit('msg-all', msg);
    });

    socket.on('typing', () => {
        socket.broadcast.emit('s-typing');
    });

    socket.on('stop-typing', () => {
        socket.broadcast.emit('stop-typing');
    });
});

server.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

// (39)