#!/usr/bin/env node

const program = require('commander');

const { description, version } = require('./package.json');

const { configure, start } = require('./commands/commandsexports');

program
  .command('configure')
  .description('Configure your ChaosQoala')
  .action((url) => {
    configure({ questions: require('./questions/questions') });
  });

program
// defines a new command and how the command will be executed as well as what text the user will see
  .command('start')
  .description('Initiate a config file')
  .action(start);

program
  // .description(description)
  // .version(version, '-v, --version')
  .parse(process.argv);

if (!process.argv.slice(2).lenght) {
  program.outputHelp();
}
