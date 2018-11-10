const { Client } = require("pg");

module.exports = async userInfo => {
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
      `SELECT
      servers.id as serverId,
      servers.name as serverName,
      servers.icon as serverIcon,
      channels.id as channelId,
      channels.name as channelName,
      channels.topic as channelTopic,
      members.id as memberId,
      members.name as memberName, 
      members.avatar as memberAvatar,
      messages.id as messageId,
      messages.timestamp as messageTimestamp,
      messages.content as messageContent
  
  FROM members
  LEFT JOIN servermembers 
  ON members.id = servermembers.memberid 
  INNER JOIN servers on servers.id = serverMembers.serverId
  INNER JOIN channels on servers.id = channels.serverId
  FULL OUTER JOIN messages on messages.channelId = channels.id and messages.memberId = members.id
  WHERE servermembers.serverid 
  IN
  (
    SELECT 
      servermembers.serverid 
  
    FROM servermembers 
    LEFT JOIN members on members.id = servermembers.memberid
    WHERE members.name = '${userInfo.userName}'
  )
  
  ORDER BY servers.name, channels.name, members.name, messages.timestamp;`
    );

    //if doesn't exist return here

    let data = {
      id: "",
      name: "",
      avatar: "",
      servers: []
    };

    response.rows.forEach(row => {
      const indexOfServer = data.servers.findIndex(
        server => server.id === row.serverid
      );
      if (indexOfServer === -1) {
        data = {
          ...data,
          id: userInfo.userName === row.membername ? row.memberid : data.id,
          name:
            userInfo.userName === row.membername ? row.membername : data.name,
          avatar:
            userInfo.userName === row.membername
              ? row.memberavatar
              : data.avatar,
          servers: [
            ...data.servers,
            {
              id: row.serverid,
              name: row.servername,
              icon: row.servericon,
              channels:
                row.channelid === null
                  ? []
                  : [
                      {
                        id: row.channelid,
                        name: row.channelname,
                        topic: row.channeltopic,
                        messages:
                          row.messageid === null
                            ? []
                            : [
                                {
                                  id: row.messageid,
                                  timestamp: row.messagetimestamp,
                                  content: row.messagecontent,
                                  memberId: row.memberid
                                }
                              ]
                      }
                    ],
              members: [
                {
                  id: row.memberid,
                  name: row.membername,
                  avatar: row.memberavatar
                }
              ]
            }
          ]
        };
      } else {
        const indexOfMember = data.servers[indexOfServer].members.findIndex(
          member => member.id === row.memberid
        );
        const indexOfChannel = data.servers[indexOfServer].channels.findIndex(
          channel => channel.id === row.channelid
        );

        console.log(data.servers[0]);
        console.log(indexOfServer);
        console.log(indexOfMember);
        console.log(indexOfChannel);

        if (indexOfChannel === -1) {
          console.log("++++++SERVER++++++");
          data = {
            ...data,
            id: userInfo.userName === row.membername ? row.memberid : data.id,
            name:
              userInfo.userName === row.membername ? row.membername : data.name,
            avatar:
              userInfo.userName === row.membername
                ? row.memberavatar
                : data.avatar,
            servers: [
              ...data.servers.slice(0, indexOfServer),
              {
                ...data.servers[indexOfServer],
                channels: [
                  ...data.servers[indexOfServer].channels,
                  row.channelid !== null && {
                    id: row.channelid,
                    name: row.channelname,
                    topic: row.channeltopic,
                    inputText: "",
                    messages:
                      row.messageid === null
                        ? []
                        : [
                            {
                              id: row.messageid,
                              timestamp: row.messagetimestamp,
                              content: row.messagecontent,
                              memberId: row.memberid
                            }
                          ]
                  }
                ],
                members: [
                  ...data.members[indexOfServer].members,
                  indexOfMember === -1 && {
                    id: row.memberid,
                    name: row.membername,
                    avatar: row.memberavatar
                  }
                ]
              },
              ...data.servers.slice(indexOfServer + 1)
            ]
          };
          console.log("++++++SERVER++++++");
        } else {
          const indexOfMessage = data.servers[indexOfServer].channels[
            indexOfChannel
          ].messages.findIndex(message => message.id === row.messageid);
          data = {
            ...data,
            id: userInfo.userName === row.membername ? row.memberid : data.id,
            name:
              userInfo.userName === row.membername ? row.membername : data.name,
            avatar:
              userInfo.userName === row.membername
                ? row.memberavatar
                : data.avatar,
            servers: [
              ...data.servers.slice(0, indexOfServer),
              {
                ...data.servers[indexOfServer],
                channels: [
                  ...data.servers[indexOfServer].channels.slice(
                    0,
                    indexOfChannel
                  ),
                  {
                    id: row.channelid,
                    name: row.channelname,
                    topic: row.channeltopic,
                    inputText: "",
                    messages:
                      indexOfMessage === -1
                        ? [
                            {
                              id: row.messageid,
                              timestamp: row.messagetimestamp,
                              content: row.messagecontent,
                              memberId: row.memberid
                            }
                          ]
                        : [
                            ...data.servers[indexOfServer].channels[
                              indexOfChannels
                            ].messages.slice(0, indexOfMessage),
                            {
                              id: row.messageid,
                              timestamp: row.messagetimestamp,
                              content: row.messagecontent,
                              memberId: row.memberid
                            },
                            ...data.servers[indexOfServer].channels[
                              indexOfChannels
                            ].messages.slice(indexOfMessage + 1)
                          ]
                  },
                  ...data.servers[indexOfServer].channels.slice(
                    indexOfChannel + 1
                  )
                ],
                members: [
                  ...data.members[indexOfServer].members,
                  indexOfMember === -1 && {
                    id: row.memberid,
                    name: row.membername,
                    avatar: row.memberavatar
                  }
                ]
              },
              ...data.servers.slice(indexOfServer + 1)
            ]
          };
        }
      }
    });
    await database.end();

    console.log(data);
    console.log("!!!!END!!!!");
    return "WHAT";
  } catch (error) {
    console.error(error);
  }
};
