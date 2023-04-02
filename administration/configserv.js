const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
 const config = require("../config.js")
const logticket = new db.table("ticketlog")
const lograid = new db.table("raidlog")
const logembed = new db.table("embedlog")
const logmod = new db.table("modlog")
const loggw = new db.table("giveaway")
const logboost = new db.table("boostlog")
const msglog = new db.table("msglog")
const alertelog = new db.table("AlertePerm")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const ct = new db.table("CategorieTicket")
const mstatut = new db.table("MsgStatut")
const rstatut = new db.table("RoleStatut")
const emote = require('../emotes.json')

module.exports = {
    name: 'config',
    usage: 'config',
    description: `Permet de voir la configuration du bot sur le serveur`,
    async execute(client, message, args) {

        const e = emote.administration.loading

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let alerte = alertelog.get(`${message.guild.id}.alerteperm`)
        if (alerte == null) alerte = "Non configuré"

        let ticket = ct.get(`${message.guild.id}.categorie`)
        if (ticket == null) ticket = "Non configuré"

        let role = db.get(`role_${message.guild.id}`)
        if (role == null) role = "Non configuré"

        let ticketlog = `<#${logticket.get(`${message.guild.id}.ticketlog`)}>`
        if (ticketlog == null) ticketlog = "Non configuré"

        let raidlog = `<#${lograid.get(`${message.guild.id}.raidlog`)}>`
        if (raidlog == null) raidlog = "Non configuré"

        let embedlog = `<#${logembed.get(`${message.guild.id}.embedlog`)}>`
        if (embedlog == null) embedlog = "Non configuré"

        let messagelog = `<#${msglog.get(`${message.guild.id}.messagelog`)}>`
        if (messagelog == null) messagelog = "Non configuré"

        let modlog = `<#${logmod.get(`${message.guild.id}.modlog`)}>`
        if (modlog == null) modlog = "Non configuré"

        let boostlog = `<#${logboost.get(`${message.guild.id}.boostlog`)}>`
        if (boostlog == null) boostlog = "Non configuré"

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const embed = new Discord.MessageEmbed()
                .addField(`Configuration du serveur`, `${emote.administration.alerte} | Salon d'alerte : <#${alerte}> \n${emote.administration.ping} | Role alerte : ${role}\n📧 | Catégorie tickets : \`${ticket}\`\n${emote.administration.rainbowheart} | Thème : ${color}`)
                .addField(`Configuration Logs`, `${e} | Logs Messages : ${messagelog}\n${e} | Logs Mods : ${modlog}\n${e} | Logs Boosts : ${boostlog}\n${e} | Logs Tickets : ${ticketlog} \n${e} | Logs Embeds : ${embedlog}\n${e} | Logs Raid : ${raidlog}`)
                .addField(`Prefix : \`${pf}\``, `\`${pf}help\` pour obtenir la liste des commandes`)
                .addField(`Latence du bot`, `${emote.administration.typing} | Ping : **${client.ws.ping}ms**`)
                .setColor(color)

            message.channel.send({ embeds: [embed] })
        }
    }
}