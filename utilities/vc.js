const Discord = module.require("discord.js");
const db = require('quick.db')
const cl = new db.table("Color")
 const config = require("../config.js")
const footer = config.app.footer
const emote = require('../emotes.json')
module.exports = {
    name: 'vc',
    usage: 'vc',
    description: `Stats du serveur`,
    async execute(client, message) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const total = message.guild.memberCount
        const online = message.guild.presences.cache.filter((presence) => presence.status !== "offline").size
        const vocal = message.guild.members.cache.filter(m => m.voice.channel).size
        const boost = message.guild.premiumSubscriptionCount || '0'

        const embed = new Discord.MessageEmbed()
            .setTitle(`・__Stats de ${message.guild.name}__`)
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`*Membres :* **${total}** ${emote.utilitaire.membres} \n*En ligne :* **${online}** ${emote.presence.online} \n*En vocal :* **${vocal}** ${emote.utilitaire.vocales} \n*Boost :* **${boost}** ${emote.utilitaire.boosts}`)
            .setFooter({ text: `` })
            .setTimestamp()
            .setFooter({ text: `Stats ${message.guild.name}` })
        message.channel.send({ embeds: [embed] })
    }
}