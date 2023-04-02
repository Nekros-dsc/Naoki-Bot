const Discord = module.require("discord.js");
const moment = require('moment')
const db = require('quick.db')
const cl = new db.table("Color")
 const config = require("../config.js")

module.exports = {
    name: 'userinfo',
    usage: 'userinfo',
    description: `jeux`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "Aucun",
            "DISCORD_EMPLOYEE": "Discord Employer",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Bot Certifié",
            "EARLY_VERIFIED_DEVELOPER": "Developer"
        };
        var bot = {
            "true": "L'utilisateur est un bot",
            "false": "L'utilisateur est un humain"
        };
        const userlol = new Discord.MessageEmbed()
            .setAuthor({name: `Informations`, iconURL: mention.user.avatarURL()})
            .setThumbnail(usericon)
            .addField(`General`, `Nom: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nSurnom: \`${nick}\``)
            .addField(`Aperçu`, `Badges: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nBot: \`${bot[mention.user.bot]}\``)
            .addField(`Informations relatives au serveur`, `Roles: <@&${mention._roles.join(">  <@&")}> \nPermissions: \`${finalPermissions.join(', ')}\``)
            .addField(`Info`, `Compte créé le: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nA rejoint le serveur: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
            .setThumbnail(mention.user.avatarURL())
            .setFooter({text: `ID: ${mention.user.id}`, iconURL: mention.user.avatarURL()})
            .setColor(color)
        message.channel.send({ embeds: [userlol] })
    }
}
