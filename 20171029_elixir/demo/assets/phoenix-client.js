'use strict'

const Socket = require('phoenix');
const socket = new Socket("/socket", {params: {userToken: "123"}})

console.log(socket);
socket.connect()