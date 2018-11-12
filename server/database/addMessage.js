const { Client } = require("pg");

module.exports = async messageInfo => {
  try {
    const { id, timestamp, content, memberId, channelId } = messageInfo;

    const database = new Client({
      user: "discord",
      host: "localhost",
      database: "discord",
      password: "discord123",
      port: 5432
    });

    await database.connect();
    //     const response = await database.query(
    // `insert into messages values
    // ('${id}',
    // '${timestamp}',
    // '${content}',
    // '${memberId}',
    // '${channelId}');`
    //      );
    await database.end();
    return messageInfo;
  } catch (error) {
    console.error(error);
  }
};
