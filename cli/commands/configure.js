const { prompt } = require('inquirer');
const { magentaBright } = require('chalk');
const { textSync } = require('figlet');

// Requiring in the configure file from the same file
const initalize = require('./initalize');
// importing the read and save functions from the initalize.js file
const { read, save } = initalize;

// declaring the questions and state objects
let { questions } = read();

/* Declaring a variable and initialziing it to null.
This will variable will be set to the results of
the user answering the questions and it will be
passed to the send function to connect to the socket */

questions = require('../questions/questions')
  .map(({ message, name }) => ({
    message,
    // This will be the returned property on the package.JSON object
    name,
  }));

function configure() {
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
  configure,
};
