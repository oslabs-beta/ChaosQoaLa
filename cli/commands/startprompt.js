/* ******THIS FILE SEEMS TO BE SUPERFLOUS CODE AND WILL LIKELY BE ABLE TO BE DELETED ***** */

// /* eslint-disable no-console */
// import { promisify } from 'util';
// import { get as _get, start as _start } from 'prompt';
// import { questions as questionsFile } from '../package.json';

// const questions = require(questionsFile);

// const get = promisify(_get);

// function start() {
//   _start();

//   get(
//     questions
//       .map(({ question }, i) => ({ name: `${i}`, description: question })),
//   )
//     .then((result) => {
//       console.log('*****YOU ARE IN THE START PROMPT********')
//       console.log('Thank you for your input:');
//       console.log(JSON.stringify(result));
//     });
// }

// export default start;
