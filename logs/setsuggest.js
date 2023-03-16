const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const footer = config.app.footer
const emote = require('../emotes.json')


module.exports = {
    name: 'setsuggest',
    usage: 'setsuggest <id>',
    description: `Permet de changer le salon des suggestions.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (db.get(`${message.guild.id}.`) === newChannel) return message.channel.send(`${emote.logs.question}・__Nouveau salon des suggestions :__ \`${db.get(`${message.guild.id}.suggestions`)}\``)
            else {
                db.set(`${message.guild.id}.suggestions`, newChannel.id)
                message.channel.send(`${emote.logs.question}・__Nouveau salon des suggestions :__ ${args[0]}`)

                const channellogs = db.get(`${message.guild.id}.suggestions`)

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag} à défini ce salon commme salon des suggestions`)
                    .setDescription(`${emote.logs.question} Ce salon est désormais utilisé pour __toutes__ **les Suggestions** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(channellogs).send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}