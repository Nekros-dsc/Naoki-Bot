const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../config.js")
const { QueryType } = require('discord-player');
const maxVol = config.app.maxVol
const emote = require('../emotes.json')

module.exports = {
    name: 'volume',
    usage: 'volume',
    category: "owner",
    description: `Music`,
    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucun son en cours de lecture ${message.author} ❌`);

        const vol = parseInt(args[0]);

        if (!vol) return message.reply(`Le volume actuel est ${queue.volume} 🔊\n*Pour modifier le volume, entrez un nombre entre **1** et **${maxVol}**.*`);

        if (queue.volume === vol) return message.reply(`Le volume que vous souhaitez modifier est déjà celui en cours ${message.author} ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`Le numéro spécifié n'est pas valide. Entrez un nombre entre **1** et **${maxVol}** ${message.author} ❌`);

        const success = queue.setVolume(vol);

        return message.reply(success ? `Volume modifié **${vol}**/**${maxVol}**% 🔊` : `Erreur ${message.author} ❌`);
    }
}