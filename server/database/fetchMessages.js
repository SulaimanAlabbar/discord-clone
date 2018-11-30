const { Client } = require("pg");
const fs = require("fs");

module.exports = async lastMessageInfo => {
  try {
    const database = new Client({
      user: "discord",
      host: "localhost",
      database: "discord",
      password: "discord123",
      port: 5432
    });

    await database.connect();
    const response = await database.query(
      `
    SELECT *
    FROM
      (
      SELECT  
          msg1.id as id,
          msg1.timestamp as timestamp,
          msg1.content as content,
          msg1.memberId as memberId
      
      FROM messages as msg1
      JOIN messages msg2 ON msg2.id = '${lastMessageInfo.lastMessageId}'
      AND
      msg1.channelId = '${lastMessageInfo.channelId}'
      AND
      msg1.timestamp < msg2.timestamp
      ORDER BY msg1.timestamp DESC
      LIMIT 50
      ) as msg3
    ORDER BY msg3.timestamp ASC;
  `
    );
    await database.end();

    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
