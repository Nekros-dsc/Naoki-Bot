const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const ownercount = new db.table("Ownercount")
const cl = new db.table("Color")
const config = require("../config")
const footer = config.app.footer

module.exports = {
    name: 'owner',
    usage: 'owner',
    category: "owner",
    description: `Permet de gérer les owners du bot.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                if (owner.get(`owners.${member.id}}`) === member.id) {
                    return message.channel.send({ content: `__${member.username}__ est déjà owner` })
                } else {
                    owner.set(`owners.${member.id}`, member.id)
                    message.channel.send({ content: `__${member.username}__ est désormais owner` })
                }


            } else if (!args[0]) {

                let list = message.guild.members.cache.filter(u => owner.get(`owners.${u.id}`) === u.id).map(a => "<@" + a.user.id + ">")

                const embed = new Discord.MessageEmbed()
                    .setTitle("liste des Owners")
                    .setDescription(list.join("\n"))
                    .setColor(color)
                    .setFooter({ text: `${footer}` })
                message.channel.send({ embeds: [embed] })

            }
        }
    }
}