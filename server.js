const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// Name generation
let first = ["smart", "fat", "big", "small", "dumb", "cute"];
let second = ["fox", "whale", "hedgehog", "cat", "dog", "ocelot", "pikachu"];

const generateName = () => {
    return first[Math.floor(Math.random() * first.length)] + "-" + second[Math.floor(Math.random() * second.length)];
};

// Socket
let onlineUsernames = [];
let onlineIds = [];

io.on("connection", socket => {
    let name = generateName();
    onlineUsernames.push(name);
    onlineIds.push(socket.id);
    console.log(name + " just connected.");
    io.emit("online-users", onlineUsernames);

    console.log(onlineUsernames);
    console.log(onlineIds);

    socket.emit("your id", name);
    socket.on("send message", body => {
        io.emit("message", body)
    });

    socket.on('disconnect', () => {
        console.log(name + " just disconnected.");
        io.emit("user-disconnected", name);
    });

    socket.on('disconnect', function () {
        let index1 = onlineIds.indexOf(socket.id);
        onlineUsernames.splice(index1, 1);

        let index2 = onlineIds.indexOf(socket.id);
        onlineIds.splice(index2, 1);

        io.emit("online-users", onlineUsernames);
        console.log("disconectu: " + socket.id);
    });
})

console.log("init");
server.listen(8000, () => console.log("server is running on port 8000"));
