const db = require("quick.db")
const config = require('../config')
const Discord = require('discord.js')
const rlog = new db.table("raidlog")
const wl = new db.table("Whitelist")
const p = new db.table("Prefix")
const al = new db.table("AntiLink")
const ae = new db.table("Antieveryone")
const owner = new db.table("Owner")
const linksall = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg',
    'discord.me',
    'discord.io',
    'invite.me',
    'discordapp.com/invite'
]

const linksinvite = [
    'discord.gg',
    '.gg',
    'discord.me',
    'discord.io',
    'invite.me',
    'discordapp.com/invite'
]

const mention = ["@everyone", "@here"]

module.exports = {
    name: "messageCreate",

    async execute(client, message, channel) {

        if (!message.guild) return;

        let isLink = false
        let isLinkall = false
        let isMention = false
        let antilinkinvite = await al.get(`config.${message.guild.id}.antilinkinvite`)
        let antilinkall = await al.get(`config.${message.guild.id}.antilinkall`)
        let antieveryone = await ae.get(`config.${message.guild.id}.antieveryone`)

        linksall.forEach(l => {
            if (message.content.includes(l)) {
                isLinkall = true
            }
        })

        linksinvite.forEach(l => {
            if (message.content.includes(l)) {
                isLink = true
            }
        })

        mention.forEach(l => {
            if (message.content.includes(l)) {
                isMention = true
            }
        })

        if (message.author.bot) return
        if (message.channel.type == "DM") return

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (owner.get(`owners.${message.member.id}`) || wl.get(`${message.guild.id}.${message.member.id}.wl`) || config.app.owners === message.author.id === true) return

        if (antilinkinvite == true) {

            if (isLink == true) {
                message.delete()
                message.member.timeout(15000)
                message.channel.send({ content: `<@${message.author.id}> Tu n'as pas le droit d'envoyé de lien dans ce serveur.` }).then(msg => {
                    setTimeout(() => msg.delete(), 6000)
                })

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> a envoyer un \`lien\` dans \`${message.channel.name}\`, j'ai supprimé son message`)
                    .setTimestamp()
                client.channels.cache.get(rlog.fetch(`${message.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(() => false)
            }

        }

        if (antilinkall == true) {

            if (isLinkall == true) {
                message.delete().catch(() => false)
                message.member.timeout(15000).catch(() => false)
                message.channel.send({ content: `<@${message.author.id}> Tu n'as pas le droit d'envoyé de lien dans ce serveur.` }).then(msg => {
                    setTimeout(() => msg.delete(), 6000)
                })


                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> a envoyer un \`lien\` dans \`${message.channel.name}\`, j'ai supprimé son message`)
                    .setTimestamp()
                const logchannel = client.channels.cache.get(rlog.fetch(`${message.guild.id}.raidlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
            }

        }

        if (antieveryone == true) {

            if (isMention == true) {

                message.channel.clone().then((ch) => {
                    ch.setParent(message.channel.parent);
                    ch.setPosition(message.channel.position);
                    message.channel.delete();
                    message.member.timeout(60000)
                    ch.send(`**le salon a été renew car <@${message.author.id}> à ping tout le serveur**`).then(msg => {
                        setTimeout(() => msg.delete(), 50000)
                    })
                })

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> a mentionner \`tout le serveur\` dans \`${message.channel.name}\`, j'ai renew le salon`)
                    .setTimestamp()
                const logchannel = client.channels.cache.get(rlog.fetch(`${message.guild.id}.raidlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}
