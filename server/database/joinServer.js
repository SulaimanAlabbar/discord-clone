const { Client } = require("pg");
const uuid = require("uuid/v4");

module.exports = async joinInfo => {
  try {
    const serverId = joinInfo.serverId;
    const memberId = joinInfo.memberId;
    console.log("=======");
    console.log(serverId, memberId);

    const database = new Client({
      user: "discord",
      host: "localhost",
      database: "discord",
      password: "discord123",
      port: 5432
    });

    await database.connect();

    console.log("SERVERID: ", serverId);

    const response1 = await database.query(
      `SELECT * FROM servers WHERE servers.id = '${serverId}';`
    );
    //  // await database.query();

    console.log("___)))");
    console.log(response1);

    if (response1.rows.length === 0) {
      console.log("server doesn't exist");
      return "noserver";
    }

    const response2 = await database.query(
      `SELECT * FROM servermembers WHERE servermembers.serverid = '${serverId}' and servermembers.memberid = '${memberId}';`
    );

    if (response2.rows.length !== 0) {
      console.log("already in server");
      return "inserver";
    }

    await database.query(
      `insert into servermembers values
    ('${serverId}',
    '${memberId}');`
    );

    const response3 = await database.query(
      `
      SELECT
      servers.id as serverId,
      servers.name as serverName,
      servers.icon as serverIcon,
      channels.id as channelId,
      channels.name as channelName,
      channels.topic as channelTopic,
      members.id as memberId,
      members.name as memberName, 
      members.avatar as memberAvatar
    
FROM servers, servermembers, channels, members

WHERE 
servers.id = channels.serverid 
and 
servers.id = servermembers.serverid 
and 
servermembers.memberid = members.id 
and 
servers.id = '${serverId}';`
    );

    //Only three queries necessary, delete the rest
    await database.end();

    //load all messages and channels and members
    return {
      id: response3.rows[0].serverid,
      name: response3.rows[0].servername,
      icon: response3.rows[0].servericon,
      channels: [
        {
          id: response3.rows[0].channelid,
          name: response3.rows[0].channelname,
          topic: response3.rows[0].channeltopic,
          inputText: "",
          userScroll: false,
          unreadMessages: false,
          messages: []
        }
      ],
      members: [
        {
          id: response3.rows[0].memberid,
          name: response3.rows[0].membername,
          avatar: response3.rows[0].memberavatar
        }
      ]
    };
  } catch (error) {
    console.error(error);
  }
};
