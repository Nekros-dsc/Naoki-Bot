const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const p = new db.table("Prefix")
const agu = new db.table("Guildupdate")

module.exports = {
    name: 'antiupdate',
    usage: 'antiupdate',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                agu.set(`guildupdate_${message.guild.id}`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**guildupdate** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                agu.set(`guildupdate_${message.guild.id}`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**guildupdate** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètres invalide`)
            }
        }
    }
}