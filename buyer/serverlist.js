const Discord = require("discord.js")
 const config = require("../config.js")
const db = require('quick.db')
const cl = new db.table("Color")
const footer = config.app.footer

module.exports = {
    name: 'serverlist',
    usage: 'serverlist',
    description: `Permet d'afficher les serveur qui possède le bot.`,
    async execute(client, message, args, color) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let description =
            `Serveurs totaux : ${client.guilds.cache.size}\n\n` + client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} ・ ${r.memberCount} Membres ・ ID : ${r.id}`)
            .slice(0, 10)
            .join('\n')
            

         

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter({ text: config.app.footer })
                .setDescription(description)
            message.channel.send({ embeds: [embed] })

        }
    }
}