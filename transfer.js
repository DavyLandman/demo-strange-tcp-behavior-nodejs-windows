const process = require("process");

function report(start, size, message) {
  const [timeSpendS, timeSpendNS] = process.hrtime(start);
  const mbSize = size / (1024 * 1024);
  console.log(
    `${message} speed (${Math.trunc(mbSize)} MB): ${
      mbSize / (timeSpendS + timeSpendNS * 1e-9)
    } MB/s`
  );
}

module.exports = {
  send(buffer, target, label, done) {
    target.on("error", done);
    const start = process.hrtime();
    target.on("close", () => {
      report(start, buffer.length, label);
      done(null);
    });

    // sure, we should use pipe/wait for drain events etc
    // but this is fine for this case
    target.write(buffer, () => target.end());
  },

  sink(source, label, done) {
    const start = process.hrtime();
    let received = 0;
    function finished() {
      report(start, received, label);
      done(null);
    }

    source.on("end", finished);
    source.on("error", done);
    source.on("data", (d) => (received += d.length));
  },
};
