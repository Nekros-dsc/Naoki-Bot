const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const fs = require('fs')
 const config = require("../config.js")

module.exports = {
    name: 'avatar',
    usage: 'avatar',
    description: `Afficher l'avatar de quelqu'un.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let member = message.mentions.users.first()
        if (!member){
            try{
                member = await client.users.fetch(args[0])
            }
            catch(e){
                member = message.author
            }
        }

        let avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })

        const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar URL`)
            .setURL(avatar)
            .setImage(avatar)
            .setFooter({ text: `Avatar` })
            .setColor(color)

        message.channel.send({ embeds: [embed] });
    }
}