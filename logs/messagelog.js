const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const msglog = new db.table("msglog")
const cl = new db.table("Color")
const footer = config.app.footer
const emote = require('../emotes.json')

module.exports = {
    name: 'messagelog',
    usage: 'messagelog <id>',
    description: `Permet de changer le salon des logs.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (msglog.get(`${message.guild.id}.messagelog`) === newChannel) return message.channel.send(`${emote.administration.loading}・__Nouveau salon des logs message :__ \`${msglog.get(`${message.guild.id}.messagelog`)}\``)
            else {
                msglog.set(`${message.guild.id}.messagelog`, newChannel.id)
                message.channel.send(`${emote.buyer.loading}・__Nouveau salon des logs :__ ${args[0]}`)

                const logs = msglog.get(`${message.guild.id}.messagelog`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} à défini ce salon commme salon des logs message`)
                    .setDescription(`${emote.buyer.loading} Ce salon est désormais utilisé pour __toutes__ les **logs message** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}