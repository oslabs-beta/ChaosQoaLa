const { prompt } = require ('inquirer');
const { magentaBright } = require ('chalk');
const { textSync } = require ('figlet');

// Requiring in the configure file from the same file
const configure = require ('./configure');
// importing the read and save functions from the configure file
const { read, save } = configure;

// declaring the questions and state objects
let { questions } = read();
const { state: answered } = read();

questions = require('../questions/questions')
  .map(({ message }, i) => ({
    // type: `${i.type}`,
    message,
    // default: `${i.default}`,

    // everytime the user answers the question, the state is updated
    when(state) {
      // eslint-disable-next-line no-prototype-builtins
      if (answered.hasOwnProperty(i)) {
        return false;
      }
      save(state);
      return true;
    },
    name: `${i}`,
  }));

function start() {
  console.log(
    magentaBright(
      textSync('ChaosQoaLa', { horizontalLayout: 'full' }),
    ),
  );
  prompt(questions)
    .then((result) => {
      save(result);
      console.log(`Your answers: ${JSON.stringify(read().state)}`);
      console.log('I am in the start function');
    });
}

module.exports = {
  start,
};
