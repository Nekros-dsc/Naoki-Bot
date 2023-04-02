const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
 const config = require("../config.js")
const fs = require('fs')
const moment = require('moment')
const footer = config.app.footer
const emote = require('../emotes.json')

module.exports = {
    name: 'serveur',
    usage: 'serveur',
    description: `Permet d'afficher des informations relatives au serveur`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (args[0] === "pic") {

            let pic = message.guild.iconURL()
            if (pic) {

                const picembed = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setImage(message.guild.iconURL({ dynamic: true, size: 1024, }))
                message.channel.send({ embeds: [picembed] })

            } else {
                const nopic = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setDescription(`Ce serveur ne possède pas d'avatar`)
                message.channel.send({ embeds: [nopic] })
            }

        }

        if (args[0] == "banner") {

            let banner = message.guild.bannerURL()
            if (banner) {

                const bannerembed = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                message.channel.send({ embeds: [bannerembed] })

            } else {
                const nobanner = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setDescription('Ce serveur ne possède pas de bannière')
                message.channel.send({ embeds: [nobanner] })
            }

        }

        if (args[0] == "info") {

            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const verifLevels = {
                NONE: "Aucune",
                LOW: "faible",
                MEDIUM: "Moyen",
                HIGH: "Élevé",
                VERY_HIGH: "Maximum",
            };

            const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const membersGuild = message.guild.members.cache;
            const channelsGuild = message.guild.channels.cache;
            const emojisGuild = message.guild.emojis.cache;

            let desc = message.guild.description
            if (desc == null) desc = "Le serveur ne possède pas de déscription !"

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                .setTitle(`Informations \`${message.guild.name}\``)
                .setDescription(`**Description**\n ${desc}`)
                .addFields(
                    {
                        name: `${emote.utilitaire.id} ID du serveur`,
                        value: `${message.guild.id}`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.blackcrown} Propriétaire`,
                        value: `<@${message.guild.ownerId}>`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.id} ID Propriétaire`,
                        value: `${message.guild.ownerId}`,
                        inline: true
                    },
                )
                .addFields(
                    {
                        name: `${emote.utilitaire.membres} Nombre de Membres`,
                        value: `${message.guild.memberCount || '0'}`,
                        inline: true
                    },
                    {
                        name: "Nombre de Boosts",
                        value: `${message.guild.premiumSubscriptionCount || '0'}`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.boosts} Niveau de Boost`,
                        value: `${premiumTier[message.guild.premiumTier]}`,
                        inline: true
                    },
                )
                .addFields(
                    {
                        name: `${emote.utilitaire.bots} Nombre de Bots`,
                        value: `${membersGuild.filter(member => member.user.bot).size}`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.iconrole} Nombre de Rôles`,
                        value: `${rolesGuild.length}`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.salon} Nombres de Salons`,
                        value: `${channelsGuild.size}`,
                        inline: true
                    },
                )
                .addFields(
                    {
                        name: `${emote.utilitaire.emotes} Nombre d'Emojis`,
                        value: `${emojisGuild.size}`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.loading} Date de création`,
                        value: `${message.guild.createdAt.toLocaleDateString("fr-eu")}`,
                        inline: true
                    },
                    {
                        name: `${emote.utilitaire.link} URL Personnalisé`,
                        value: message.guild.vanityURLCode ? `discord.gg/${message.guild.vanityURLCode}` : `Le serveur ne possède pas d'url`,
                        inline: true
                    },
                )
                .addFields(
                    {
                        name: `${emote.utilitaire.iconsettings} Vérification du serveur`,
                        value: `${verifLevels[message.guild.verificationLevel]}`,
                        inline: true
                    },

                )
                .setFooter({ text: `${footer}` })
            message.channel.send({ embeds: [embed] })

        }

    }
}