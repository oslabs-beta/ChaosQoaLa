const figlet = require('figlet')
const chalk = require ('chalk');

console.log(
    chalk.magentaBright(
        figlet.textSync('ChaosQoaLa', { horizontalLayout: 'full'})
    )
);