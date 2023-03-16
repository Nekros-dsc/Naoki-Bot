const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const lock = new db.table("Serverlock")
const p = new db.table("Prefix")
const cl = new db.table("Color")

module.exports = {
    name: 'server',
    usage: 'server',
    description: `Permet de fermé le serveur`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] === "lock") {
                if (lock.get(`serverlock_${message.guild.id}`) === "lock") return message.channel.send(`**Le serveur est déja vérouiller**`)
                lock.set(`serverlock_${message.guild.id}`, "lock")
                message.channel.send(`Le serveur est maintenant **vérouiller**`)

            } else if (args[0] === "unlock") {
                if (lock.get(`serverlock_${message.guild.id}`) === "unlock") return message.channel.send(`**Le serveur n'est pas vérouiller**`)
                lock.set(`serverlock_${message.guild.id}`, false)
                message.channel.send(`Le serveur est maintenant **dévérouiller**`)

            }
        }
    }
}