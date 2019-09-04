const { readFileSync, appendFileSync } = require('fs');
const { join } = require('path');
const io = require('socket.io-client');
const fetch = require('node-fetch');

const ALL_AGENT_DATA = [];

const packageJSON = join(__dirname, '..', 'package.json');

/* The below function reads the package.json file and grabs the state
and opens a socket.io connection to send the configure information to the agent */
async function start() {
  // console.log(state);
  const myPackageJSON = readFileSync(packageJSON, 'utf8');
  const parsedMyPackageJSON = JSON.parse(myPackageJSON);
  const { state } = parsedMyPackageJSON.chaosQoala;
  // Establishes a ensueChaos property on the state that will be set to
  state.ensueChaos = true;
  // creates result file with current time stamp. Appends file with chaos config from state
  const fileTimestamp = new Date().toJSON();

  // Retrieves the user's socket information from the package.json
  const { socketPort } = state;
  const socket = io.connect(socketPort);
  socket.on('connect', () => {
    socket.emit('eucalyptus', state, () => {
      console.log('GraphQL server received config');
    });
  });

  socket.on('eucalyptus', (agentData) => {
    ALL_AGENT_DATA.push(agentData);
  });

  const {
    steadyStateStartURL, steadyStateStartHTTPVerb, steadyStateStopURL, steadyStateStopHTTPVerb,
  } = state;

  await fetch(steadyStateStartURL, {
    method: steadyStateStartHTTPVerb,
  })
    .then(() => { console.log('steady state monitoring service started successfully'); })
    .catch((err) => { console.log(`steady steady monitoring service failed to start: ${err}`); });

  const keypress = async () => {
    process.stdin.setRawMode(true);
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    }));
  };

  (async () => {
    console.log('Press any key to stop chaos');
    await keypress();
    await fetch(steadyStateStopURL, { method: steadyStateStopHTTPVerb })
      .then(response => response.json())
      .then((chaosResults) => {
        appendFileSync(
          `${fileTimestamp}_results.json`,
          JSON.stringify({ chaosConfig: state, chaosResults, agentData: ALL_AGENT_DATA }, null, 2),
        );
      });
    // ensueChaos flag changed to false when any key pressed
    state.ensueChaos = false;
    socket.emit('eucalyptus', state, () => {
      console.log('chaos ended');
    });
  })().then(process.exit);
}


module.exports = {
  start,
};
