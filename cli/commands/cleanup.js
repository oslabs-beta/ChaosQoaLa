// // This file contains clean up information for the command line

// // This object captures all exit processes and will be exported to the start file
// module.exports = {

//   noExitProcess: () => {},

//   Cleanup(callback) {
//   // this attaches a user callback to the exit command
//   // we will callback the exit function here to save the results
//   // if there is no callback passed, then it will move on to another exit process
//     callback = callback || noExitProcess;
//     process.on('cleanup', callback);

//     // this process exits with any keystroke
//     console.log('Press any key to exit');
//     process.stdin.setRawMode(true);
//     process.stdin.resume();
//     process.stdin.on('data', process.exit.bind(process, 0));

//     // catches uncaught excpetions
//     process.on('uncaughtException', ((event) => {
//       console.log('Uncaught excpetion error');
//       console.log(event.stack);
//       process.exit(99);
//     }));
//   },

// };
