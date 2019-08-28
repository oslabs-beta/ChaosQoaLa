const { readFileSync } = require('fs');
const { join } = require('path');
const io = require('socket.io');
const { userAnswers } = require('./start')
const app = require('express')();
const chaosSocketServer = require('http').Server(app);

const socket = `${userAnswers.socketioport}`
/* The below function will grab the information
from the readConfigFile function above, then send
that information over a websocket to the agent  */
function send() {
  io.on('connection', (socket) => {
    socket.emit('sending ChaosQoala Information', userAnswers);
    io.emit('sending ChaosQoala Information', userAnswers);
  });
}

module.exports = {
  send,
};


// // Read where the packageJSON location in the file directory
// const packageJSON = join(__dirname, '..', 'package.json');

// // Create a variable where the package JSON is required in
// const configFile = require(packageJSON);

/* Declaring a variable chaosConfig that will initlaize
to null and later be set in the readConfigAnswers
function */
// let chaosConfig = null;

/* This function calls the answers provided by the users
after they have provided them. This function will
be used as a callback function in the send function below */
// function readConfigFile(state) {
//   configFile.chaosQoala = {
//     ...state,
//   };
//   readFileSync(
//     packageJSON,
//     chaosConfig = JSON.parse(configFile),
//   );
// }
