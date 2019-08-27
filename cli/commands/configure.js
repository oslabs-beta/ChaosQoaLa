const { writeFileSync } = require('fs');
const { join } = require('path');

// reads a provided local file path
const packageJSON = join(__dirname, '..', 'package.json');
const configFile = require(packageJSON);


// saves the conifguration for future use
function configure(state) {
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

// LOOK AT GRABBING THE PACKAGE AFTER THE PACKAGE IS READ
// look at renaming the properties in state
function read() {
  const { configQuestions = {} } = configFile;
  const {
    questions = [], state = {
      socket: '',
      blastRadius: '',
      delay: '',
      missingData: '',
      runTime: '',
    },
  } = configQuestions;
  return {
    questions,
    state,
  };
}

function save(state) {
  const { configQuestions = {} } = configFile;
  configure({ ...configQuestions, state: { ...configQuestions.state, ...state } });
}

module.exports = {
  configure,
  read,
  save,
  askQuestions,
};
