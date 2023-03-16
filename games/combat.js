const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const config = require("../config")
const footer = config.app.footer
const { Fight } = require("weky")

module.exports = {
    name: 'combat',
    usage: 'combat',
    description: `jeux`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (!message.mentions.members.first()) {
            return message.reply("Vous devez mentionner quequ'un")
        }
        await Fight({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Combat',
                color: color,
                footer: footer,
                timestamp: true
            },
            buttons: {
                hit: 'Attaquer',
                heal: 'Soigner',
                cancel: 'Stop',
                accept: 'Accepter',
                deny: 'Refuser'
            },
            acceptMessage: '<@{{challenger}}> a défié <@{{opponent}}> pour un combat!',
            winMessage: 'GG, <@{{winner}}> a gagné le combat !',
            endMessage: '<@{{opponent}}> n\'a pas répondu',
            cancelMessage: '<@{{opponent}}> à refusé le combat',
            fightMessage: '{{player}} tu y vas en premier !',
            opponentsTurnMessage: 'Veuillez attendre que vos adversaires bougent!',
            highHealthMessage: 'Vous ne pouvez pas guérir si vos PV sont supérieurs à 80!',
            lowHealthMessage: 'Vous ne pouvez pas annuler le combat si vos PV sont inférieurs à 50!',
            returnWinner: false,
            othersMessage: 'Seulement {{author}} peut utiliser ce bouton!'
        });
    }
}