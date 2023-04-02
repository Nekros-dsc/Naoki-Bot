const Discord = require("discord.js")
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")

module.exports = {
    name: 'imghelp',
    usage: 'imghelp',
    description: `Permet de choisir l'image affiché sur l'accueil du help.`,
    async execute(client, message, args) {


        if (owner.get(`owners.${message.author.id}`) || (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) === true) {

            const img = args[0]

            const tema = new Discord.MessageEmbed()
                .setDescription(`Merci de spécifiez l'image en copiant le lien comme ceci sinon le module ne fonctionnera pas`)
                .setImage('https://cdn.discordapp.com/attachments/904084986536276059/986098885317517372/unknown.png')

            if (!img) return message.channel.send({ embeds: [tema] })

            message.reply({ content: `Cette image sera désormais affiché dans l'accueil du help` })
            db.set(`img_${message.guild.id}`, img)

        }
    }
}