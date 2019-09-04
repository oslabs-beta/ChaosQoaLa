// some of the code below was taken from this handy npm module
// https://github.com/zuojiang/modify-response-middleware/tree/master/src


// GLOBAL SETUP OF WEB SOCKET CHANNEL, AND MODULE SCOPED VARIABLES
// ---------------------------------------------------------------

const zlib = require('zlib');
const app = require('express')();
const chaosSocketServer = require('http').Server(app);
const io = require('socket.io')(chaosSocketServer);

// intialize module flags - these values will be dynamically
// changed via configuration info sent over socket.io

// master on/off switch
let ENSUE_CHAOS = false;
// length of any latency injection
let DELAY_RESPONSE_MS = 0;
// map of queries and if they will be targets for data knockout
let QUERY_TARGETS = {};
// the blast radius of the current experiemnt
let BLAST_RADIUS = 0;
// this is calculated per message - but scoped at module level for ease of implementation
let CHAOS_CHANCE = 0;
// web socket address of config and data streaming
// use a port number above 1024 for linux compatibility
const CHAOS_PORT = 1025;

// start the socket channel on port 1025
// configuration information will be sent to this channel and
// live streaming results data will be sent back to the controller
// process during chaos experiments.
chaosSocketServer.listen(CHAOS_PORT);

io.on('connection', (socket) => {
  // all chaos data is sent and received on the topic 'eucalyptus'
  // if data arrives on this port then it is a config message from the controller
  socket.on('eucalyptus', (config, acknowledge) => {
    // extract and assign configuration vals
    const {
      ensueChaos,
      delay,
      blastRadius,
      affectedQueries,
    } = config;

    ENSUE_CHAOS = ensueChaos;
    BLAST_RADIUS = blastRadius;
    DELAY_RESPONSE_MS = delay;
    QUERY_TARGETS = affectedQueries;

    // invoke callback sent by the controller to acknowledge receipt of config
    acknowledge();
  });
});

// HELPER FUNCTIONS
// ----------------

// encoding and decoding functions for servers implementing compression
// of response data, in such cases we need to de-compress before altering
// any content during chaos experiments then re-compress

function encoding(res, content) {
  switch (res.getHeader('content-encoding')) {
    case 'gzip':
      return zlib.gzipSync(content);
    case 'deflate':
      return zlib.deflateSync(content);
    default: return content;
  }
}
function decoding(res, content) {
  switch (res.getHeader('content-encoding')) {
    case 'gzip':
      return zlib.gunzipSync(content);
    case 'deflate':
      return zlib.inflateSync(content);
    default: return content;
  }
}

// FUNCTION THAT CAN BE USED TO CREATE A PIECE OF MIDDLEWARE
// THAT RE-WRITES THE EXPRESS RESPONSE API FUNCTIONS SO THAT
// RATHER THAN SENDING DATA BACK TO THE CLIENT THE DATA IS PASSED
// TO THE 'modify' CALL BACK WHICH MAY MODIFY THE RESPONSE
// BEFORE IT IS SENT BACK AS NORMAL TO THE CLIENT
// -------------------------------------------------------------

const modifyRes = function responseHijackingMiddlewareCreator(modify) {
  // note the signature of the returned function - just like a regular named middleware
  return (req, res, next) => {
    // preserve then original res.end function
    const expressAPIEnd = res.end;
    // create a buffer and a helper function to write to it
    const list = [];
    res.write = (chunk) => {
      list.push(chunk);
    };

    // IMPORTANT re-write express res.end so instead of sending data it just
    // exposes response data to the callback provided, then repackages the
    // potentially altered response and sends it back to the client
    // via the original express API res.end implementation.
    res.end = async function newExpressResEndFunction(chunk) {
      // data will be exposed to the callback function via this variable
      let content;
      // if data being supplied in this call to res.end then add to the buffer
      if (chunk) list.push(chunk);
      if (Buffer.isBuffer(list[0])) content = Buffer.concat(list);
      else content = list.join('');
      // decode data if required
      let decodedContent = decoding(res, content);

      // this is the IMPORTANT line where the code calls the callback responsible
      // for altering the content data
      decodedContent = await modify(decodedContent, req, res);

      // re encode the data if required
      if (Buffer.isBuffer(decodedContent) || typeof decodedContent === 'string') {
        content = encoding(res, decodedContent);
        // reset the content length to an adjusted value
        if (!res.headersSent) {
          res.setHeader('content-length', content.length);
        }
      }
      // IMPORTANT invoke original express res.send function
      expressAPIEnd.call(res, content);
    };
    if (next) next();
  };
};

// eslint-disable-next-line no-unused-vars
const chaos = modifyRes(async (content, req, res) => {
  // create a promisi-fied timeout function to inflict latency
  function addLatency(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  try {
    // attempt to parse the data in to json
    const data = JSON.parse(content.toString());
    // if currently running a chaos experiment
    if (ENSUE_CHAOS === true) {
      // to determine if this response will be affected - 'roll the dice'
      // by getting a manual number and comparing against the blast radius
      // the bigger the blast radius value is, the greater the chances the number
      // will be less than it and a chaos effect will be seen
      CHAOS_CHANCE = Math.random();
      const affectMessageWithChaos = (CHAOS_CHANCE < BLAST_RADIUS);

      // construct a logging data packet for this response
      const agentData = {
        timeOfResponse: new Date().toJSON(),
        chaosResponse: affectMessageWithChaos,
      };

      // send the logging data packet back to the controller
      io.emit('eucalyptus', agentData);

      // if we are affecting this message
      if (affectMessageWithChaos) {
        // add latency
        await addLatency(DELAY_RESPONSE_MS);
        // knock out a section of data based on configuation against queries
        const dataSectionsOfResults = Object.keys(data.data);
        dataSectionsOfResults.forEach((name) => {
          // if a data section is on the knock out list remove the data from the response
          if (QUERY_TARGETS[name]) delete data.data[name];
        });
      }
    }
    // return altered data
    return Buffer.from(JSON.stringify(data));
  } catch (err) {
    // if data not parsable as json it will error and be caught in this section
    // so just pass back unaffected content as this response is probably unrelated
    // to GraphQL
    return content;
  }
});

module.exports = { chaos, chaosSocketServer };
