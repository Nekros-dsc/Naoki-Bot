const { Connect4 } = require('discord-gamecord')
const Discord = require("discord.js")
const config = require("../config")
const db = require('quick.db')
const cl = new db.table("Color")
const footer = config.app.footer

module.exports = {
    name: 'puissance4',
    usage: 'puissance4',
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (!message.mentions.members.first()) 
        return message.reply("Veuillez mentionner un membre")

        new Connect4({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Puissance 4',
                color: color,
            },
            emojis: {
                player1: '🔵',
                player2: '🟡'
            },
            turnMessage: '{emoji} | C\'est maintenant le tour de **{player}**',
            winMessage: '{emoji} | **{winner}** a gagné la partie',
            gameEndMessage: 'Le jeu est resté interminé :(',
            drawMessage: 'C\'est une égalité',
            askMessage: 'Hey {opponent}, {challenger} vous a défié pour une partie de Puissance 4',
            cancelMessage: 'On dirait qu\'il a refusé',
            timeEndMessage: 'L\'adversaire n\'a pas répondu',
        }).startGame();
    },
};