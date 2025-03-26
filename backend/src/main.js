const express = require("express");
const { getPrice } = require("./prices");
const { addPrice, getLastPrices } = require("./db");
const app = express();
const port = 3000;

const expressWs = require("express-ws")(app);

const codes = ['USD', 'EUR'];

for (let code of codes) {
  app.ws(`/last/${code}`, function (ws, req) {});
}

async function broadcastLastPrice(code) {
  const price = await getPrice(code);

  addPrice(code, price);

  const lastPrice = getLastPrices(code, 1);

  const codeIndex = codes.indexOf(code);

  let clientIndex = 0;
  for (let client of expressWs.getWss().clients.values()) {
    console.log(codeIndex, clientIndex)
    if (clientIndex === codeIndex) {
      client.send(lastPrice[0]);
    }

    clientIndex++;
  }
}

setInterval(async () => {
  for (let code of codes) {
    await broadcastLastPrice(code);
  }
}, 5_000);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
