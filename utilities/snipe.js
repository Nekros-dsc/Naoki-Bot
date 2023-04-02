const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
 const config = require("../config.js")
const fs = require('fs')
const moment = require('moment')
const footer = config.app.footer
const links = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg'
]


module.exports = {
    name: 'snipe',
    usage: 'snipe',
    description: `Permet d'afficher le derniers message supprimé sur le serveur`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let isLinkall = false

        const msg = client.snipes.get(message.channel.id)
        if (!msg) return message.channel.send("Aucun message n'a été supprimer récemment !")

        links.forEach(l => {
            if (msg.content.includes(l)) {
                isLinkall = true
            }
        })

        if (isLinkall == true) {
            const embedl = new Discord.MessageEmbed()
                .setDescription(`**${msg.author.tag}** \`\`\`discord.gg/******\`\`\``)
            return message.channel.send({ embeds: [embedl] })
        }


        const embed = new Discord.MessageEmbed()
            .setDescription(`**${msg.author.tag}** \`\`\`${msg.content}\`\`\``)
            .setColor(color)
            .setFooter({ text: `${footer}` })
        if (msg.image) embed.setImage(msg.image)

        message.channel.send({ embeds: [embed] })
    }
}
