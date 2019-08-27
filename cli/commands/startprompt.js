const { questions: questionsFile } = require('../package.json');
const questions = require(questionsFile);

const { promisify } = require('util');
const prompt = require('prompt');
const get = promisify(prompt.get);

function start() {
    prompt.start()

    get(
        questions
          .map(({question}, i) => ({name: `${i}`, description: question }))
    )
          .then((result) =>{
            console.log('Thank you for your input:')
            console.log(JSON.stringify(result))
        })
};

module.exports = start