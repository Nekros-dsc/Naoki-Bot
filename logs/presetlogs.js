const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")
const boostlog = new db.table("boostlog")
const embedlog = new db.table("embedlog")
const msglog = new db.table("msglog")
const raidlog = new db.table("raidlog")
const modlog = new db.table("modlog")
const ticketlog = new db.table("ticketlog")
const giveawaylog = new db.table("giveawaylog")
const alertefunny = new db.table("AlertePerm")
const cl = new db.table("Color")
const footer = config.app.footer
const emote = require('../emotes.json')


module.exports = {
    name: 'presetlogs',
    usage: 'presetlogs',
    description: `Permet de créer automatiquement la catégorie des logs.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            message.channel.send(`${emote.administration.loading} Création de la **catégorie des logs** en cours...`).then(msge => {
                message.guild.channels.create('LOGS', {
                    type: 'GUILD_CATEGORY',
                    permissionsOverwrites: [{
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }]
                }).then(c => {
                    //alerte
                    c.guild.channels.create(`⚡・alerte-perm`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        alertefunny.set(`${message.guild.id}.alerteperm`, logs.id)
                    })
                    //messagelog
                    c.guild.channels.create(`📁・logs-message`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        msglog.set(`${message.guild.id}.messagelog`, logs.id)
                    })
                    //logs raid
                    c.guild.channels.create(`📁・logs-raid`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        raidlog.set(`${message.guild.id}.raidlog`, logs.id)
                    })
                    //modlog
                    c.guild.channels.create(`📁・logs-mod`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        modlog.set(`${message.guild.id}.modlog`, logs.id)
                    })
                    //boostlog
                    c.guild.channels.create(`📁・logs-boost`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        boostlog.set(`${message.guild.id}.boostlog`, logs.id)
                    })
                    //ticketlog
                    c.guild.channels.create(`📁・logs-ticket`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        ticketlog.set(`${message.guild.id}.ticketlog`, logs.id)
                    })

                    //giveawaylog
                    c.guild.channels.create(`📁・logs-giveaways`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        giveawaylog.set(`${message.guild.id}.giveawaylog`, logs.id)
                    })

                    msge.edit(`${emote.buyer.valid} Création de la **catégorie des logs** effectué avec succès.`)

                }
                )
            }
            )
        }
    }
}