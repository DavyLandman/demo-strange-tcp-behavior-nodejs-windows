const crypto = require("crypto");
const net = require("net");
const transfer = require("./transfer");

function startSinkServer() {
  const s = net.createServer((c) => {
    transfer.sink(c, "server - receive", () => {});
  });
  s.listen(5051);
}

function startSendServer() {
  const buffer = crypto.randomBytes(100 * 1024 * 1024);
  const s = net.createServer((c) => {
    transfer.send(buffer, c, "server - send", () => {});
  });
  s.listen(5050);
}

startSendServer();
startSinkServer();
