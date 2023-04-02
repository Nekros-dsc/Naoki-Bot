const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const alerte = new db.table("AlertePerm")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const p3 = new db.table("Perm3")
 const config = require("../config.js")
const fs = require('fs')
const moment = require('moment')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'unlock',
    usage: 'unlock',
    description: `Permet de unlock un salon`,
    async execute(client, message, args, color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color


            let roles = message.mentions.roles.size > 0 ? message.mentions.roles.map(r => r.id) : args.length > 0 ? args.map(arg => message.guild.roles.cache.get(arg)).filter(Boolean) : null;
            let users = message.mentions.users.size > 0 ? message.mentions.users.map(r => r.id) : args.length > 0 ? args.map(arg => message.guild.members.cache.get(arg)).filter(Boolean) : null;;
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
            if(channel.isThread())
              return message.reply({embeds :[new MessageEmbed()
             
                .setTitle(`Je peux pas déverouiller un thread`)
              ]});
            
            
              if((users && users.length > 0) || (roles && roles.length > 0)){
                if(users && users.length > 0){
                  for(const user of users) {
                    await channel.permissionOverwrites.edit(user, { 
                      SEND_MESSAGES: true,
                      ADD_REACTIONS: true
                    }).catch(console.warn)
                  }
                }
                if(roles && roles.length > 0){
                  for(const role of roles) {
                    await channel.permissionOverwrites.edit(role, { 
                      SEND_MESSAGES: true,
                      ADD_REACTIONS: true
                    }).catch(console.warn)
                  }
                }
                message.reply({embeds :[new MessageEmbed()
              
                  .setTitle(`Le salon à été unlock`)
                ]});
              } else {
                if(channel.permissionOverwrites.cache.filter(permission => permission.deny.toArray().includes("SEND_MESSAGES")).size < 1)
                  return message.reply({embeds :[new MessageEmbed()
            
                    .setTitle(`Le salon n'est pas verouiller`)
                  ]});
                await channel.permissionOverwrites.set(
                  channel.permissionOverwrites.cache.map(permission => {
                    let Obj = {
                      id: permission.id,
                      deny: permission.deny.toArray(),
                      allow: permission.allow.toArray(),
                    };
                    if(Obj.deny.includes("SEND_MESSAGES")){
                      Obj.allow.push("SEND_MESSAGES");
                      let index = Obj.deny.indexOf("SEND_MESSAGES");
                      if(index > -1){
                        Obj.deny.splice(index, 1);
                      }
                    }
                    if(Obj.deny.includes("ADD_REACTIONS")){
                      Obj.allow.push("ADD_REACTIONS");
                      let index = Obj.deny.indexOf("ADD_REACTIONS");
                      if(index > -1){
                        Obj.deny.splice(index, 1);
                      }
                    }
                    return Obj;
                }))
                message.reply({embeds :[new MessageEmbed()
              
                  .setTitle(`Le salon : \`${channel.name}\` à bien été unlock`)
                ]});
              }
            }            

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.author.id}> a \`déverouiller\` le salon <#${message.channel.id}>`)
            .setTimestamp()
            .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

    }
}
