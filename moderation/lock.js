const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const alerte = new db.table("AlertePerm")
const cl = new db.table("Color")
const ml = new db.table("modlog")
 const config = require("../config.js")
const fs = require('fs')
const moment = require('moment')
const p3 = new db.table("Perm3")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'lock',
    usage: 'lock',
    description: `Permet de lock un salon`,
    async execute(client, message, args, color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color



            
    let roles = message.mentions.roles.size > 0 ? message.mentions.roles.map(r => r.id) : args.length > 0 ? args.map(arg => message.guild.roles.cache.get(arg)).filter(Boolean) : null;
    let users = message.mentions.users.size > 0 ? message.mentions.users.map(r => r.id) : args.length > 0 ? args.map(arg => message.guild.members.cache.get(arg)).filter(Boolean) : null;;
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    if(channel.isThread())
      return message.reply({embeds :[new MessageEmbed()

        .setTitle(`Je peux pas lock un thread`)
      ]});



    if(channel.permissionOverwrites.cache.size < 1){
      if((users && users.length > 0) || (roles && roles.length > 0)){
        if(users && users.length > 0){
          for(const user of users) {
            await channel.permissionOverwrites.edit(user, { 
              SEND_MESSAGE: false,
              ADD_REACTIONS: false
            }).catch(() => {})
          }
        }
        if(roles && roles.length > 0){
          for(const role of roles) {
            await channel.permissionOverwrites.edit(role, { 
              SEND_MESSAGE: false,
              ADD_REACTIONS: false
            }).catch(() => {})
          }
        }
        message.reply({embeds :[new MessageEmbed()

          .setTitle(`Le salon à bien était lock`)
        ]});
      } else {
        await channel.permissionOverwrites.set([{
          id: message.guild.roles.everyone.id,
          deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
        }])
        message.reply({embeds :[new MessageEmbed()

          .setTitle(`Le salon à bien était lock`)
        ]});
      }
    } else {
      if((users && users.length > 0) || (roles && roles.length > 0)){
        if(users && users.length > 0){
          for(const user of users) {
            await channel.permissionOverwrites.edit(user, { 
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            }).catch(console.warn)
          }
        }
        if(roles && roles.length > 0){
          for(const role of roles) {
            await channel.permissionOverwrites.edit(role, { 
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            }).catch(console.warn)
          }
        }
      
      } else {
        if(channel.permissionOverwrites.cache.filter(permission => permission.allow.toArray().includes("SEND_MESSAGES")).size < 1)
          return message.reply({embeds :[new MessageEmbed()

            .setTitle(`Le salon à bien était lock`)
          ]});
        await channel.permissionOverwrites.set(
          channel.permissionOverwrites.cache.map(permission => {
              let Obj = {
                id: permission.id,
                deny: permission.deny.toArray(),
                allow: permission.allow.toArray(),
              };
              if(Obj.allow.includes("SEND_MESSAGES")){
                Obj.deny.push("SEND_MESSAGES");
                let index = Obj.allow.indexOf("SEND_MESSAGES");
                if(index > -1){
                  Obj.allow.splice(index, 1);
                }
              }
              if(Obj.allow.includes("ADD_REACTIONS")){
                Obj.deny.push("ADD_REACTIONS");
                let index = Obj.allow.indexOf("ADD_REACTIONS");
                if(index > -1){
                  Obj.allow.splice(index, 1);
                }
              }
              return Obj;
          }))
        message.reply({embeds :[new MessageEmbed()

          .setTitle(`Le salon à bien était lock`)
        ]});
      }
    }





        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.author.id}> a \`vérouiller\` le salon <#${message.channel.id}>`)
            .setTimestamp()
            .setFooter({ text: `📚` })
        const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
        if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

    }
    }}
