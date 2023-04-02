const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../config.js")
const { QueryType } = require('discord-player');
const emote = require('../emotes.json')

module.exports = {
    name: 'play',
    usage: 'play',
    category: "owner",
    description: `Music`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color


        if (!args[0]) return message.reply(`Veuillez entrer une recherche valide ${emote.musique.no}`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply(`Aucun résulat ${emote.musique.no}`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Lancement de votre ${res.playlist ? 'playlist' : 'musique'} ${emote.musique.yes}`)
        .setColor(color)

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.reply({embeds: [embed]});
        }

        await message.reply({embeds: [embed]});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();

    }
}

