const express = require ('express');
const app = express();
const port = 3000;
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname + "public")));

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function (socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data})
    })
    console.log("connected")
    socket.on("user-disconnected", function(){
        io.emit("user-disconnected", socket.id);
    })
})

app.get('/', (req, res) => {

res.render("index")
});
server.listen(port, () => {
    console.log(`HTTP Server is running on port ${port}`);
});