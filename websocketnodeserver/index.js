console.log(('hiiiii'));
var express = require('express');
var cors = require('cors')
var socket = require('socket.io');
const { userjoin, getcurrentuser } = require("./userdetail")

var app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"]
  })
)
try {
  var server = app.listen(4000, () => {
    console.log('listening for requests on port 30000');
  });
}
catch (err) {
  console.log(err);
}

activeUserList = []

groupList=[];


var io = socket(server, {
  allowEIO3: true
});
let room
io.on('connection', (socket) => {
  console.log(`New connection ${socket.id}`)
  // socket.on("joinrooms" ,(room)=>{
  //     console.log(room,"roooms")
  //     console.log("joining room user socket id....",socket.id);
  //     const user=userjoin(socket.id , room)
  //     console.log("user",user);
  //     socket.join(room);
  //     // socket.broadcast.to(user.room).emit('chat' , data)
  // })data
  socket.on("join", (data) => {
    console.log("join: ", data);
    socket.join(data.roomName);
    groupList.push(data);
    io.emit('group', groupList);
    console.log("zzz")
    // io.emit("group-name",data.roomName)
  });

  // io.emit('userID',socket.id)
  // socket.on('join-room' ,(room1)=>{
  //     console.log("11111111111111111111");
  //       socket.join(room1)
  //       console.log("rommm-1",room1);
  //       room = room1
  // })

  socket.on('userlist', (list) => {
    // list['socketid']=socket.id
    activeUserList.push({
      socketid: socket.id,
      name: list
    })
    console.log(activeUserList, 'activeUserList');

    io.emit('listlist', activeUserList)
    console.log("event are emitting....")
  })
  socket.on("chat", (data) => {
    // data['Idsocket']=socket.id
    console.log(data, "soso");
    if (data.roomName) {
      io.in(data.roomName).emit("chat", data)

    } else if (data.Idsocket) {
      io.to(data.Idsocket).emit("chat", data);

    }
    console.log(data, 'yewala')
    console.log(data, 'iddd');
  });
  socket.on('typing', (data) => {
    io.sockets.emit('typing', data);
  });
  socket.on('disconnect', (disconnected) => {
    activeUserList = activeUserList.filter((item) => {
      return socket.id != item.socketid
    })
    io.emit("listlist", activeUserList)
    // io.sockets.to(user.userroom).emit('disconnect',disconnected);
    console.log('A user disconnected!');
  });
});



