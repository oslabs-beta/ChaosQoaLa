module.exports = [{
    type: 'input',
    name: 'socketioport',
    message: 'Please enter the Socket.io port over which you will be sending the ChaosQoala',
  }, {
    type: 'number',
    name: 'blastRadius',
    message: 'Please enter your desired blast radius',
    default: Math.random(),
  }, {
    type: 'number',
    name: 'delay',
    message: 'Please enter the amount of time you would like your data to be dealyed (in milliseconds)',
  }, {
    type: 'boolean',
    name: 'missingData',
    message: 'Please enter the percentage of results you would like missing from your GQL queries',
  }, {
    type: 'number',
    name: 'runTime',
    message: 'Please enter how long you would like the ChaosQoala to run (in minutes). **NOTE: The default runtime is 1 hour',
    default: 60,
  }]