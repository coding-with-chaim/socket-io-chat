const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// Name generation
let first = ["smart", "fat", "big", "small", "dumb"];
let second = ["fox", "whale", "hedgehog", "cat", "dog", "ocelot", "pikachu"];

const generateName = () => {
    return first[Math.floor(Math.random() * first.length)] + "-" + second[Math.floor(Math.random() * second.length)];
};

// Socket
let online = [];

io.on("connection", socket => {
    let name = generateName();
    online.push(name);
    console.log(name + " just connected.");
    io.emit("connectu", name);

    io.to(socket.id).emit("fuck", online);

    socket.emit("your id", name);
    socket.on("send message", body => {
        io.emit("message", body)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(8000, () => console.log("server is running on port 8000"));
