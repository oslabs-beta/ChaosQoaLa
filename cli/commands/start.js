const inquirer = require ('inquirer');
const figlet = require('figlet')
const chalk = require ('chalk');

//Requiring in the configure file from the same file
const configure = require ('./configure');
//importing the read and save functions from the configure file
const { read, save } = configure;

//declarign the questions and state objects
let { questions, state:answered } = read();


 questions = require ('../questions/questions')
  .map(({ question, message }, i) =>({
      //type: `${i.type}`,
      message: message,
      //default: `${i.default}`,
      
      //everytime the user answers the question, the state is updated 
      when(state){
          if(answered.hasOwnProperty(i)){
              return false
          }
          save(state)
          return true
      },
      name: `${i}`
  }))

  function start () {
    console.log(
        chalk.magentaBright(
            figlet.textSync('ChaosQoaLa', { horizontalLayout: 'full'})
        ));
      inquirer.prompt(questions)
        .then((result) => {
            save(result)
            console.log(`Your answers: ${JSON.stringify(read().state)}`)
            console.log('I am in the start function')
        })
  };

  module.exports = {
      start,
  }