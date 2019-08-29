const config = {
  socketPort: "http://localhost:1025",
  graphQLPort: "http://localhost:3000",
  blastRadius: 1.0,
  delay: 2000,
  missingData: true,
  affectedQueries: { knockMeOut: true, dontKnockMeOut: false },
  runTime: "60",
  ensueChaos: true
};

module.exports = config;
