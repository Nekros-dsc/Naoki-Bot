const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const p3 = new db.table("Perm3")
const config = require('../config')
const fs = require('fs')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    usage: 'slowmode',
    category: "",
    description: `Permet de mettre un mode lent sur un channel.`,
    async execute(client, message, args) {
      
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(p3.fetch(`perm3_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const currentCooldown = message.channel.rateLimitPerUser;
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

            if (args[0] === 'off') {

                message.channel.send(`Le mode lent est maintenant désactiver dans <#${channel.id}>`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`<@${message.author.id}> a désactivé le \`slowmode\` sur le salon <#${message.channel.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

                return message.channel.setRateLimitPerUser(0)

            }

            const time = ms(args[0]) / 1000;

            if (isNaN(time)) return message.channel.send(`Aucune heure valide trouvé pour \`${args[0]}\``)

            if (time >= 21600) return message.channel.send('Le mode lent ne peut pas être supérieur à 6h')

            if (currentCooldown === time) return message.channel.send(`Mode lent déjà défini sur ${args[0]} dans <#${channel.id}>`);

            message.channel.setRateLimitPerUser(time).then(m => m.send(`Le mode lent est maintenant de ${args[0]} dans <#${channel.id}>`));

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a mis un \`slowmode\` de ${args[0]} sur le salon <#${message.channel.id}>`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}
