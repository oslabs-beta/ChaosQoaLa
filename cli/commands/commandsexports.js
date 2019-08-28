// This exports the command files in one file to make things a touch easier

module.exports = {
  ...require('./initalize'),
  ...require('./configure'),
  ...require('./start'),
};
