const Discord = require("discord.js")
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const wl = new db.table("Whitelist")
const emote = require('../emotes.json')

module.exports = {
    name: 'antijoin',
    usage: 'antijoin',
    description: `Permet de d'interdire l'accès à des vocaux.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

         

            if (args[0] == 'add') {

                const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1] || message.channelId);
                if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
                if (db.get(`${message.guild.id}.antivoc.${newChannel.id}`) === newChannel) return message.channel.send(`${emote.vocaux.voc}・__Le salon <#${db.get(`${message.guild.id}.antivoc.${newChannel}`)}> est désormais interdit__\n*(Bypass par les owners et la Whitelist)*`)
                else {
                    db.set(`${message.guild.id}.antivoc.${newChannel.id}`, newChannel.id)
                    message.channel.send(`${emote.vocaux.voc}・__Le salon ${newChannel} est désormais interdit__\n*(Bypass par les owners et la Whitelist)*`)

                }
            }

            if (args[0] == 'remove') {

                const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1] || message.channelId);
                db.set(`${message.guild.id}.antivoc.${newChannel.id}`, null)
                message.channel.send({ content: `Le salon ${newChannel} n'est plus interdit` })

            }

            if (args[0] == 'clear') {

                db.delete(`${message.guild.id}.antivoc`)
                message.channel.send({ content: `Tous les salons interdit sont de nouveau autorisé` })

            }
        }
    }
}
