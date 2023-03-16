const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const config = require("../config")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const cl = new db.table("Color")
const fs = require('fs')

module.exports = {
    name: 'botlist',
    usage: 'botlist',
    description: `Permet d'afficher la liste des bots présent sur le serveur.`,
    async execute(client, message) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)
  
        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let bots = message.guild.members.cache.filter(m => m.user.bot).size;
            let noms = message.guild.members.cache.filter(m => m.user.bot).map(m => `${m.user.tag}: \`(${m.user.id})\``).join("\n");
            var embed = new Discord.MessageEmbed()
                .setTitle(`Liste des Bots`)
                .setDescription(`${noms}`)
                .setFooter({ text: `Total: ${bots}` })
                .setColor(color)
            message.channel.send({ embeds: [embed] })
        }
    }
}