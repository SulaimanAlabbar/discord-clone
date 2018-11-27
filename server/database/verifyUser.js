const { Client } = require("pg");
const fs = require("fs");

module.exports = async userInfo => {
  try {
    const username = userInfo.name;
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
      srv.id as serverId,
      srv.name as serverName,
      srv.icon as serverIcon,
      ch.id as channelId,
      ch.name as channelName,
      ch.topic as channelTopic,
      mem1.id as memberId,
      mem1.name as memberName, 
      mem1.avatar as memberAvatar,
      msg2.id as messageId,
      msg2.timestamp as messageTimestamp,
      msg2.content as messageContent
  
  FROM members mem1
  JOIN serverMembers srvmem1 ON srvmem1.memberId = mem1.id 
  JOIN servers srv ON srv.id = srvmem1.serverId
  JOIN channels ch ON ch.serverId = srv.id
  JOIN servermembers srvmem2 ON srvmem2.serverId = srv.id
  JOIN members mem2 ON mem2.id = srvmem2.memberId
  LEFT JOIN LATERAL
    (
      SELECT * from messages msg1
        WHERE msg1.channelId = ch.id
        ORDER BY msg1.timestamp DESC
        LIMIT 50 
    ) 
  AS msg2 ON true
  WHERE mem2.name = '${username}' and msg2.memberId = mem1.id
  ORDER BY srv.name, ch.name, msg2.timestamp, mem1.name;`
    );

    if (response.rows.length === 0) return false;

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
          id: username === row.membername ? row.memberid : data.id,
          name: username === row.membername ? row.membername : data.name,
          avatar: username === row.membername ? row.memberavatar : data.avatar,
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
                        inputText: "",
                        userScroll: false,
                        unreadMessages: false,
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

        if (indexOfChannel === -1) {
          data = {
            ...data,
            id: username === row.membername ? row.memberid : data.id,
            name: username === row.membername ? row.membername : data.name,
            avatar:
              username === row.membername ? row.memberavatar : data.avatar,
            servers: [
              ...data.servers.slice(0, indexOfServer),
              {
                ...data.servers[indexOfServer],
                channels:
                  row.channelid === null
                    ? []
                    : [
                        ...data.servers[indexOfServer].channels,
                        {
                          id: row.channelid,
                          name: row.channelname,
                          topic: row.channeltopic,
                          inputText: "",
                          userScroll: false,
                          unreadMessages: false,
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
                members:
                  indexOfMember === -1
                    ? [
                        ...data.servers[indexOfServer].members,
                        {
                          id: row.memberid,
                          name: row.membername,
                          avatar: row.memberavatar
                        }
                      ]
                    : [...data.servers[indexOfServer].members]
              },
              ...data.servers.slice(indexOfServer + 1)
            ]
          };
        } else {
          const indexOfMessage = data.servers[indexOfServer].channels[
            indexOfChannel
          ].messages.findIndex(message => message.id === row.messageid);

          if (indexOfMessage === -1) {
            data = {
              ...data,
              id: username === row.membername ? row.memberid : data.id,
              name: username === row.membername ? row.membername : data.name,
              avatar:
                username === row.membername ? row.memberavatar : data.avatar,
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
                      userScroll: false,
                      unreadMessages: false,
                      messages:
                        row.messageid === null
                          ? [
                              ...data.servers[indexOfServer].channels[
                                indexOfChannel
                              ].messages
                            ]
                          : [
                              ...data.servers[indexOfServer].channels[
                                indexOfChannel
                              ].messages,
                              {
                                id: row.messageid,
                                timestamp: row.messagetimestamp,
                                content: row.messagecontent,
                                memberId: row.memberid
                              }
                            ]
                    },
                    ...data.servers[indexOfServer].channels.slice(
                      indexOfChannel + 1
                    )
                  ],
                  members:
                    indexOfMember === -1
                      ? [
                          ...data.servers[indexOfServer].members,
                          {
                            id: row.memberid,
                            name: row.membername,
                            avatar: row.memberavatar
                          }
                        ]
                      : [...data.servers[indexOfServer].members]
                },
                ...data.servers.slice(indexOfServer + 1)
              ]
            };
          } else {
            data = {
              ...data,
              id: username === row.membername ? row.memberid : data.id,
              name: username === row.membername ? row.membername : data.name,
              avatar:
                username === row.membername ? row.memberavatar : data.avatar,
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
                      userScroll: false,
                      unreadMessages: false,
                      messages: [
                        ...data.servers[indexOfServer].channels[
                          indexOfChannel
                        ].messages.slice(0, indexOfMessage),
                        {
                          id: row.messageid,
                          timestamp: row.messagetimestamp,
                          content: row.messagecontent,
                          memberId: row.memberid
                        },
                        ...data.servers[indexOfServer].channels[
                          indexOfChannel
                        ].messages.slice(indexOfMessage + 1)
                      ]
                    },
                    ...data.servers[indexOfServer].channels.slice(
                      indexOfChannel + 1
                    )
                  ],
                  members:
                    indexOfMember === -1
                      ? [
                          ...data.servers[indexOfServer].members,
                          {
                            id: row.memberid,
                            name: row.membername,
                            avatar: row.memberavatar
                          }
                        ]
                      : [...data.servers[indexOfServer].members]
                },
                ...data.servers.slice(indexOfServer + 1)
              ]
            };
          }
        }
      }
    });
    await database.end();

    return data;
  } catch (error) {
    console.error(error);
  }
};
