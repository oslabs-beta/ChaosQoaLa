/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable default-case */
// 99% of the code below was taken from this handy npm module
// https://github.com/zuojiang/modify-response-middleware/tree/master/src
const zlib = require('zlib');

let DELAY_RESPONSE_MS = 0;
let REQUESTS_SO_FAR = 0;
let QUERY_TARGETS;
let BLAST_RADIUS;
let CHAOS_CHANCE;
let ENSUE_CHAOS = false;
const app = require('express')();
const chaosSocketServer = require('http').Server(app);
const io = require('socket.io')(chaosSocketServer);

chaosSocketServer.listen(1025);

io.on('connection', (socket) => {
  socket.on('eucalyptus', (config, acknowledge) => {
    console.log(config);
    ENSUE_CHAOS = config.ensueChaos;
    const { delay } = config;
    const { blastRadius } = config;
    const { affectedQueries } = config;
    BLAST_RADIUS = blastRadius;
    DELAY_RESPONSE_MS = ENSUE_CHAOS === true ? delay : 0;
    QUERY_TARGETS = ENSUE_CHAOS === true ? affectedQueries : {};
    acknowledge();
  });
});

io.on('close', (socket) => {
  socket.on('client-msg', (config, fn) => {
  });
});


function encoding(res, content) {
  switch (res.getHeader('content-encoding')) {
    case 'gzip':
      return zlib.gzipSync(content);
    case 'deflate':
      return zlib.deflateSync(content);
  }
  return content;
}

function decoding(res, content) {
  switch (res.getHeader('content-encoding')) {
    case 'gzip':
      return zlib.gunzipSync(content);
    case 'deflate':
      return zlib.inflateSync(content);
  }
  return content;
}

const modifyRes = function (modify) {
  return (req, res, next) => {
    const _end = res.end;
    const list = [];
    res.write = function (chunk) {
      list.push(chunk);
    };
    res.end = function (chunk) {
      if (chunk) {
        list.push(chunk);
      }
      let content;
      if (Buffer.isBuffer(list[0])) {
        content = Buffer.concat(list);
      } else {
        content = list.join('');
      }
      let _content = decoding(res, content);
      _content = modify(_content, req, res);
      if (Buffer.isBuffer(_content) || typeof _content === 'string') {
        content = encoding(res, _content);
        if (!res.headersSent) {
          res.setHeader('content-length', content.length);
        }
      }
      if (ENSUE_CHAOS === true && (CHAOS_CHANCE < BLAST_RADIUS) && DELAY_RESPONSE_MS > 0) {
        setTimeout(() => {
          _end.call(res, content);
        }, DELAY_RESPONSE_MS);
      } else {
        _end.call(res, content);
      }
      if (next) next();
    };
  };
};


const chaos = modifyRes((content, req, res) => {
  try {
    const data = JSON.parse(content.toString());
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    REQUESTS_SO_FAR += 1;
    if (ENSUE_CHAOS === true) {
      CHAOS_CHANCE = Math.random();
      const agentData = {
        timeOfResponse: new Date().toJSON(),
        chaosResponse: ENSUE_CHAOS,
      };
      // testing emit method (data successfully being received by apollo.test.js & express.test.js)
      io.emit('eucalyptus', agentData);
      if (CHAOS_CHANCE < BLAST_RADIUS) {
      // get list of keys in the data object returned by the query
        const dataSectionsOfResults = Object.keys(data.data);
        dataSectionsOfResults.forEach(((name) => {
        // if a data section is on the knock out list remove the data from the response
          if (QUERY_TARGETS[name]) delete data.data[name];
        }));
      }
    }
    return Buffer.from(JSON.stringify(data));
  } catch (err) {
    return content;
  }
});

module.exports = { chaos, chaosSocketServer };
