1. put `server.js` and `transfer.js` on machine A
2. run: `NODE_ENV=production node server.js`
3. make sure port 5050 and 5051 are open for B
4. put `client.js` and `transfer.js` on machine B
5. run `NODE_ENV=production TARGET_HOST="A" node client.js`


## Benchmarks

also run iperf3 between the two locations.

| client | server | network (slowest links peed) | s->c (download) | c->s (upload) | iperf3 |
|--|--|--|--:|--:|--:|
| windows | windows | loopback | 435MB/s | 805MB/s | 9GB/s |
| windows | windows | private (1gbit) | 100MB/s | 100MB/s | 85MB/s |
| windows | linux | private (1gbit) | 99MB/s | 104MB/s | 86MB/s |
| windows | linux | public (1gbit) | 32MB/s | 77 MB/s | 95MB/s |
| windows | linux2 | public (1gbit) | 30MB/s | 57 MB/s | 88MB/s |
| linux | linux | loopback |  827MB/s | 1276MB/s | 5GB/s |
| linux | linux | private (10gbit hetzner) | 540MB/s  | 370MB/s | 315 MB/s |
| linux | linux | public (1gbit) | 43MB/s | 89MB/s | 65MB/s |
| linux | windows | public (1gbit duplex) |  ? | ? | ? |
