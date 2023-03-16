const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const config = require("../config")

module.exports = {
    name: 'mp',
    usage: 'mp',
    description: `Permet d'envoyer un mp à un membre via le bot.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const user = message.mentions.users.first()
            const msg = args.slice(1).join(" ")

            if (!user) return message.reply(`Veuillez mentionner la personne à qui vous souhaitez envoyé un message privé`)
            if (!msg) return message.reply(`Veuillez écrire le message qui sera envoyé`)

            user.send(`${msg}`).then(() => {
                return message.reply("Le MP à bien été envoyé")
            }).catch(() => {
                return message.reply("Les MP de l'utilisateur sont fermé ")
            })
        }
    }
}