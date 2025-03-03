const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync(":memory:");
database.exec(`
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY,
    code TEXT,
    price REAL
  );
`);

module.exports.addPrice = (code, price) => {
  const statement = database.prepare(
    "INSERT INTO prices (code, price) VALUES (?, ?);"
  );
  statement.run(code, price);
};

module.exports.getLastPrices = (code, count) => {
  const statement = database.prepare(
    "SELECT price FROM prices WHERE code = ? ORDER BY id DESC LIMIT ?;"
  );
  
  return statement.all(code, count).map((row) => row.price);
};
