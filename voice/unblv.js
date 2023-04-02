const Discord = require("discord.js")
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const blv = new db.table("blvoc")
const footer = config.app.footer


module.exports = {
    name: 'unblv',
    usage: 'unblv',
    description: `Permet de gérer la blv.`,
    async execute(client, message, args) {


        if (owner.get(`owners.${message.author.id}`) || (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) === true) {

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
                if (blv.get(`${message.guild.id}.${member.id}.blv`) === null) { return message.channel.send(`${member.username} n'est pas Blacklist vocal`) }
                blv.subtract(`${message.guild.id}.blvcount`, 1)
                blv.delete(`${message.guild.id}.${member.id}.blv`, member.id)
                message.channel.send(`${member.username} n'est plus blacklist vocal`)


            }
        }
    }
}