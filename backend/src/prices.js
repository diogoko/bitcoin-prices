module.exports.getPrice = async (code) => {
  // const response = await fetch(`https://api.example.com/prices/${code}`);
  // const data = await response.json();
  // return data.price;

  const response = await fetch(`https://data-api.coindesk.com/spot/v1/latest/tick?market=coinbase&instruments=BTC-${code}`);
  const data = await response.json();

  return data.Data[`BTC-${code}`].PRICE;

  // return Math.random() * 100000 + 25000;
}
