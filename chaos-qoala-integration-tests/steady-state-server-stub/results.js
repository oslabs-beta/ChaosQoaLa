const { MersenneTwister19937, integer } = require('random-js');

const getResults = (
  baseline,
  lowerVariance,
  upperVariance,
  startDate,
  endDate,
  resultsPerSecond,
) => {
  // results container
  const results = [];

  // calculate min/max range via varience against baseline
  const lowerDelta = Math.floor(baseline * (lowerVariance / 100));
  const upperDelta = Math.floor(baseline * (upperVariance / 100));
  const min = baseline - lowerDelta;
  const max = baseline + upperDelta;

  // create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
  const engine = MersenneTwister19937.autoSeed();
  // create a distribution that will consistently produce integers within min/max
  const distribution = integer(min, max);
  // ms interval bewteen results
  const msBetweenResults = Math.floor(1000 / resultsPerSecond);

  // fake time that will increment during results production
  let resultMs = startDate.getTime();
  const endMs = endDate.getTime();
  // while the end time hasnt been reached add a new fake result
  while ((resultMs + msBetweenResults) <= endMs) {
    // new result time
    resultMs += msBetweenResults;
    results.push({ timeOfResult: (new Date(resultMs)).toJSON(), result: distribution(engine) });
  }
  return results;
};

module.exports = getResults;
