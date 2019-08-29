const { readFileSync } = require('fs');
const { join } = require('path');
const io = require('socket.io-client');

const packageJSON = join(__dirname, '..', 'package.json');

/* The below function reads the package.json file and grabs the state from the chaosQa  */
function stop() {
  // console.log(state);
  const myPackageJSON = readFileSync(
    packageJSON,
    'utf8',
  );
  const parsedMyPackageJSON = JSON.parse(myPackageJSON);
  const { state } = parsedMyPackageJSON.chaosQoala;
  state.ensueChaos = false;
  // console.log(state);
  const { socketPort } = state;
  const socket = io.connect(socketPort);
  socket.on('connect', () => {
    socket.emit('eucalyptus', state, () =>{
      console.log('GraphQL server received config')
    });
  });
}


module.exports = {
  stop,
};
