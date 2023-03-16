const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const alerte = new db.table("AlertePerm")
const cl = new db.table("Color")
const footer = config.app.footer
const emotes = require('../emotes.json')

module.exports = {
    name: 'setalerte',
    usage: 'alerte <id>',
    description: `Permet de changer le salon d'alerte.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (alerte.get(`${message.guild.id}.alerteperm`) === newChannel) return message.channel.send(`${emotes.owner.alert}・__Nouveau salon d'alerte :__ \`${alerte.get(`${message.guild.id}.alerteperm`)}\``)
            else {
                alerte.set(`${message.guild.id}.alerteperm`, newChannel.id)
                message.channel.send(`${emotes.owner.alert}・__Nouveau salon d'alerte :__ ${args[0]}`)

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag} à défini ce salon commme salon d'Alerte`)
                    .setDescription(`${emotes.owner.iconsettings} Ce salon est désormais utilisé pour __toutes__ **les Alertes Permissions** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(alerte.get(`${message.guild.id}.alerteperm`)).send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}