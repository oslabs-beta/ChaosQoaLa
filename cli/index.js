#!/usr/bin/env node

const program = require('commander');

const { configure, start } = require('./commands/commandsexports');

program
// defines a new command and how the command will be executed as well as what text the user will see
  .command('configure')
  .description('Initiate a config file')
  .action(configure);

program
  .command('start')
  .description('Send the information to the ChaosQoala agent')
  .action(start);

program
  .parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp();
}
