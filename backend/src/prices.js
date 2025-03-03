module.exports.getPrice = async (code) => {
  // const response = await fetch(`https://api.example.com/prices/${code}`);
  // const data = await response.json();
  // return data.price;

  return Math.random() * 100000 + 25000;
}
