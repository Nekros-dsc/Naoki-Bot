const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const ab = new db.table("Antiban")

module.exports = {
    name: 'antiban',
    usage: 'antiban',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                ab.set(`config.${message.guild.id}.antiban`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antiban** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                ab.set(`config.${message.guild.id}.antiban`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antiban** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètres invalide`)
            }
        }
    }
}