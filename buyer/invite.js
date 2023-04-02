const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const { MessageActionRow, MessageButton } = require('discord.js');

 const config = require("../config.js")

module.exports = {
    name: 'invite-s',
    aliases: [],
    async execute(client, message, args, data, color) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {
        let prefix = db.get(` ${process.env.owner}.prefix`)
        if (prefix === null) prefix = process.env.prefix;
        let color = process.env.color



        const num = parseInt(args[0]) - 1

        const Guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(x => x.id)
        
        const GuildID = Guilds[num]
        
        const myGuild = client.guilds.cache.get(GuildID)
         const id = myGuild.channels.cache.filter(e => e.isText()).first() 
          const invite = id.createInvite()
          .then(invite => message.channel.send('https://discord.gg/' + invite.code))
          .catch (console.error)
            
            
            }
                    }
                }
