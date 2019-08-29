module.exports = [{
  type: 'input',
  name: 'socketPort',
  message: 'Please enter the URI of the Socket.io port over which Chaos will be sent and received',
}, {
  type: 'input',
  name: 'graphQLPort',
  message: 'Please enter the URI of GraphQL service',
},
{
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
  message: 'Please enter TRUE or FALSE if you would like results missing from your GQL queries.',
}, {
  type: 'number',
  name: 'runTime',
  message: 'Please enter how long you would like the ChaosQoala to run (in minutes). **NOTE: The default runtime is 1 hour',
  default: 60,
}];
