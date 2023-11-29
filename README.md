1. put `server.js` and `transfer.js` on machine A
2. run: `node server.js`
3. make sure port 5050 and 5051 are open for B
4. put `client.js` and `transfer.js` on machine B
5. run `TARGET_HOST="A" node client.js`
