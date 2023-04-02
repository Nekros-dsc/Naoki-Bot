const figlet = require('figlet');
const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const p = new db.table("Prefix")
 const config = require("../config.js")
const footer = config.app.footer
const cl = new db.table("Color")

module.exports = {
    name: 'gay',
    usage: 'gay',
    description: `jeux`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member


        let notgay = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Es tu Gay ?`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**${member.user.username} aime les Femmes c'est pas un gay sale fou**`)

        let biengay = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Es tu Gay ?`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**${member.user.username} est bien gay à 1000% est soutient les lgbt :rainbow_flag:**`)
            .setImage('https://cdn.discordapp.com/attachments/926958863201222686/1001961571028828261/pddddd.gif')

        //hétéros
        if (member == '1055889359334813847') return message.channel.send({ embeds: [notgay] }) //Funny
        if (member == '1055889359334813847') return message.channel.send({ embeds: [notgay] }) //Mizuke
        //Les pd
        if (member == '886649065352364103') return message.channel.send({ embeds: [biengay] }) //Beta
        if (member == '934825685078409216') return message.channel.send({ embeds: [biengay] }) //Pussy


        let Result = Math.floor(Math.random() * 101);

        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Es tu Gay ?`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**${member.user.username} est ${Result}% Gay :rainbow_flag:**`)

        message.channel.send({ embeds: [embed] });

    }
}