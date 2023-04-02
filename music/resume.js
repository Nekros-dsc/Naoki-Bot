const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../config.js")
const { QueryType } = require('discord-player');
const emote = require('../emotes.json')

module.exports = {
    name: 'resume',
    usage: 'resume',
    category: "owner",
    description: `Music`,
    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Aucun son en cours de lecture ${message.author} ❌`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `Musique actuelle ${queue.current.title} a repris ${emote.musique.yes}` : `Quelque chose s'est mal passé ❌`);

    }
}