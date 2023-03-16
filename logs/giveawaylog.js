const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const giveawaylog = new db.table("giveawaylog")
const cl = new db.table("Color")
const footer = config.app.footer
const emote = require('../emotes.json')


module.exports = {
    name: 'giveawaylog',
    usage: 'giveawaylog <id>',
    description: `Permet de changer le salon des logs.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (giveawaylog.get(`${message.guild.id}.giveawaylog`) === newChannel) return message.channel.send(`${emote.utilitaire.boosts}・__Nouveau salon des logs boost :__ \`${giveawaylog.get(`${message.guild.id}.giveawaylog`)}\``)
            else {
                giveawaylog.set(`${message.guild.id}.giveawaylog`, newChannel.id)
                message.channel.send(`${emote.utilitaire.boosts}・__Nouveau salon des logs boost :__ ${args[0]}`)

                const logs = giveawaylog.get(`${message.guild.id}.giveawaylog`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} à défini ce salon commme salon des logs giveaways`)
                    .setDescription(`${emote.utilitaire.boosts} Ce salon est désormais utilisé pour __toutes__ les **logs giveaways** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}