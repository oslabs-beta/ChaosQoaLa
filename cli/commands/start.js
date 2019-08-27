const { prompt } = require('inquirer');
const { magentaBright } = require('chalk');
const { textSync } = require('figlet');

// Requiring in the configure file from the same file
const configure = require('./configure');
// importing the read and save functions from the configure file
const { read, save } = configure;

// declaring the questions and state objects
let { questions } = read();
const { state: answered } = read();

questions = require('../questions/questions')
  .map(({ message }, i) => ({
    message,
    // everytime the user answers the question, the state is updated to true
    when(state) {
      if (answered.hasOwnProperty(i)) {
        return false;
      }
      save(state);
      return true;
    },
    // This will be the returned property on the package.JSON object
    name: `${i}`,
  }));

function start() {
  /* The below uses figlet and chalk to print ChaosQoala in
   the terminal when the user starts ChaosQoala */
  console.log(
    magentaBright(
      textSync('ChaosQoaLa', { horizontalLayout: 'full' }),
    ),
  );
  prompt(questions)
    .then((result) => {
      save(result);
      console.log(`Your answers: ${JSON.stringify(result)}`);
    });
}

module.exports = {
  start,
};
