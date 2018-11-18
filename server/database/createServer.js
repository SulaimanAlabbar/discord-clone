const { Client } = require("pg");
const uuid = require("uuid/v4");

module.exports = async serverInfo => {
  try {
    const serverId = uuid();
    const serverName = serverInfo.name;
    const serverIcon = serverInfo.icon;

    const memberId = serverInfo.memberId;

    const channelId = uuid();
    const channelName = "main";
    const channelTopic = "topic";

    const database = new Client({
      user: "discord",
      host: "localhost",
      database: "discord",
      password: "discord123",
      port: 5432
    });

    await database.connect();
    await database.query(
      `insert into servers values
    ('${serverId}',
    '${serverName}',
    '${serverIcon}');`
    );
    await database.query(
      `insert into servermembers values
    ('${serverId}',
    '${memberId}');`
    );
    await database.query(
      `insert into channels values
    ('${channelId}',
    '${channelName}',
    '${channelTopic}',
    '${serverId}');`
    );

    const response = await database.query(
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
    await database.end();

    console.log(response);

    return {
      id: response.rows[0].serverid,
      name: response.rows[0].servername,
      icon: response.rows[0].servericon,
      channels: [
        {
          id: response.rows[0].channelid,
          name: response.rows[0].channelname,
          topic: response.rows[0].channeltopic,
          inputText: "",
          userScroll: false,
          unreadMessages: false,
          messages: []
        }
      ],
      members: [
        {
          id: response.rows[0].memberid,
          name: response.rows[0].membername,
          avatar: response.rows[0].memberavatar
        }
      ]
    };
  } catch (error) {
    console.error(error);
  }
};
