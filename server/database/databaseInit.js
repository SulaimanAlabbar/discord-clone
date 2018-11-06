const { Client } = require("pg");

async function databaseInit() {
  console.log("!!!!START!!!!");

  try {
    const database = new Client({
      user: "discord",
      host: "localhost",
      database: "discord",
      password: "discord123",
      port: 5432
    });
    await database.connect();

    const response = await database.query("SELECT * FROM SERVERS");
    console.log(response.rows);

    await database.end();
    console.log("!!!!END!!!!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = databaseInit;
