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
let ensueChaos = false;
const app = require('express')();
const chaosSocketServer = require('http').Server(app);
const io = require('socket.io')(chaosSocketServer);

chaosSocketServer.listen(80);

io.on('connection', (socket) => {
  socket.on('eucalyptus', (config, acknowledge) => {
    ensueChaos = config.ensueChaos;
    const { delay } = config;
    const { blastRadius } = config;
  
    DELAY_RESPONSE_MS = ensueChaos === true ? delay : 0;
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
      setTimeout(() => {
        _end.call(res, content);
      }, DELAY_RESPONSE_MS);
    };
    if (next) next();
  };
};


const chaos = modifyRes((content, req, res) => {
  try {
    const data = JSON.parse(content.toString());
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    REQUESTS_SO_FAR += 1;
    if (ensueChaos === true) { data.data.message += ' Chaos QoaLa Injected This'; } else {
      data.data.message += `Chaos-less Response, IP of client = ${ip}. Total requests so far = ${REQUESTS_SO_FAR}`;
    }
    return Buffer.from(JSON.stringify(data));
  } catch (err) {
    return content;
  }
});

module.exports = { chaos, chaosSocketServer };
