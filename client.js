const crypto = require("crypto");
const transfer = require("./transfer");
const net = require("net");
const process = require("process");

function download(host, port, done) {
  const client = net.createConnection({
    noDelay: true,
    port: port,
    host: host,
  });
  transfer.sink(client, "client - receive", done);
}

function upload(host, port, done) {
  const buffer = crypto.randomBytes(100 * 1024 * 1024);
  const client = net.createConnection({
    noDelay: true,
    port: port,
    host: host,
  });
  transfer.send(buffer, client, "client - send", done);
}

console.log("Started sending");
const host = process.env["TARGET_HOST"] ?? "localhost";
download(host, 5050, (e) => {
  if (e) {
    console.error(e);
    return;
  }
  upload(host, 5051, (e) => {
    if (e) {
      console.error(e);
      return;
    }
    console.log("Done");
  });
});
