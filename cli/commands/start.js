const { readFileSync, appendFileSync } = require("fs");
const { join } = require("path");
const io = require("socket.io-client");
const ALL_AGENT_DATA = [];

const packageJSON = join(__dirname, "..", "package.json");

/* The below function reads the package.json file and grabs the state
and opens a socket.io connection to send the configure information to the agent */
function start() {
  // console.log(state);
  const myPackageJSON = readFileSync(packageJSON, "utf8");
  const parsedMyPackageJSON = JSON.parse(myPackageJSON);
  const { state } = parsedMyPackageJSON.chaosQoala;
  // Establishes a ensueChaos property on the state that will be set to
  state.ensueChaos = true;
  console.log(state);
  appendFileSync("results.log", JSON.stringify(state));

  // Retrieves the user's socket information from the package.json
  const { socketPort } = state;
  const socket = io.connect(socketPort);
  socket.on("connect", () => {
    socket.emit("eucalyptus", state, () => {
      console.log("GraphQL server received config");
    });
  });

  socket.on("eucalyptus", agentData => {
    ALL_AGENT_DATA.push(agentData);
  });

  // The below allows the user to press any key to end the ChaosQoala
  console.log("Press any key to exit");
  // This line keeps the program from closing instantly
  process.stdin.resume();
  process.stdin.setRawMode(true);
  // Once the user has pressed the key, it should call the stop function
  process.stdin.on("data", process.exit.bind(process, 0));
  function exitHandler(options, exitCode) {
    if (options.cleanup) stop();
    // if (exitCode || exitCode === 0) console.log(stop);
    if (options.exit) process.exit();
  }

  // On exit, the exitHandler is bound to the exit key allowing stop to called
  process.on("exit", exitHandler.bind(null, { cleanup: true }));
}

function stop() {
  appendFileSync("results.log", JSON.stringify(ALL_AGENT_DATA));
  console.log("*********This has ended");
}

module.exports = {
  start
};
