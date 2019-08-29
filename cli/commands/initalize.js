const { writeFileSync } = require('fs');
const { join } = require('path');

// reads the path to the package.json file 
const packageJSON = join(__dirname, '..', 'package.json');
const configFile = require(packageJSON);

/* Saves the users' questions in the package.json file */
function initalize(state) {
  configFile.chaosQoala = {
    ...state,
  };

  writeFileSync(
    packageJSON,
    JSON.stringify(configFile, null, 2),
  );
}

/* This function reads the configuration file */

function read() {
  const { configQuestions = {} } = configFile;
  const { questions = [], state = {} } = configQuestions;
  return {
    questions,
    state,
  };
}

/* This function saves the updated config file */
function save(state) {
  const { configQuestions = {} } = configFile;
  initalize({ ...configQuestions, state: { ...configQuestions.state, ...state } });
}

module.exports = {
  initalize,
  read,
  save,
};
