const Discord = require("discord.js")
 const config = require("../config.js")
const db = require('quick.db')
const owner = new db.table("Owner")
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

module.exports = {
    name: 'watch',
    usage: 'watch <statut>',
    description: `Permet de changer le statut du bot.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let status = args.join(" ")
           if (args.join(" ").length > 20) return message.reply("le status ne peux pas faire plus de 20 caracteres")

            client.user.setActivity(status, { type: "WATCHING", url:"https://twitch.tv/karma"})
            db.set('stream', status)
            db.set('type', "WATCHING")
            message.reply(`Le bot regarde dès à présent : **${status}**`)
        }
    }
}