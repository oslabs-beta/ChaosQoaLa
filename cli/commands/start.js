const { readFileSync } = require('fs');
const { join } = require('path');
const io = require('socket.io-client');

const packageJSON = join(__dirname, '..', 'package.json');
//const cleanup = require('./cleanup');

/* The below function reads the package.json file and grabs the state
and open a socket.io connection to send the configure information to the agent */
function start() {
  // console.log(state);
  const myPackageJSON = readFileSync(
    packageJSON,
    'utf8',
  );
  const parsedMyPackageJSON = JSON.parse(myPackageJSON);
  const { state } = parsedMyPackageJSON.chaosQoala;
  // Establishes a ensueChaos property on the state that will be set to 
  state.ensueChaos = true;
  console.log(state);

  // Retrieves the user's socket information from the package.json
  const { socketPort } = state;
  const socket = io.connect(socketPort);
  socket.on('connect', () => {
    socket.emit('eucalyptus', state, () =>{
      console.log('GraphQL server received config')
    });
  });

  /* The below allows the user to press any key to end the ChaosQoala. 
  Once the user has pressed the key, it should call the stop function */
  console.log('Press any key to exit');
  // This line keeps the program from closing instantly
  process.stdin.resume();
  process.stdin.setRawMode(true);
  process.stdin.on('data', process.exit.bind(process, 0));
  /* will likely need the below code to trigger the stop function if the user presses a key to end the start function
  process.stdin.on */
  /* ******* THE STOP FUNCTION WILL GO HERE */
}


module.exports = {
  start,
};
