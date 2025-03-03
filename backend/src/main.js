const express = require("express");
const { getPrice } = require("./prices");
const { addPrice, getLastPrices } = require("./db");
const app = express();
const port = 3000;

const expressWs = require("express-ws")(app);

app.ws("/bpi/last", function (ws, req) {});

setInterval(async () => {
  const price = await getPrice("bpi");

  addPrice("bpi", price);

  const lastPrice = getLastPrices("bpi", 1);

  expressWs.getWss().clients.forEach((client) => {
    client.send(lastPrice[0]);
  });
}, 3000);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
