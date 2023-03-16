const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const config = require("../config")
const cl = new db.table("Color")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'say',
    usage: 'say',
    description: `Permet de repéter un message.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            message.delete();
            if (args.join(" ") == '@everyone') return
            message.channel.send({ content: args.join(" ") });
        }
    }
}