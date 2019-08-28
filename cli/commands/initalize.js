const { writeFileSync } = require('fs');
const { join } = require('path');

// reads a provided local file path
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
// Come back and look at this function
function askQuestions(answers) {
  configure({ questions: answers });
}

/* **LOOK AT GRABBING THE PACKAGE AFTER THE PACKAGE IS READ
As of write now, the state is being read before the answers
are submitted, so the users' input is not being shown
in the terminal */
/* This function reads the local file path */
/* This function may no longer be necessary */
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
  askQuestions,
};
