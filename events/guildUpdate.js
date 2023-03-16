const Discord = require('discord.js')
const config = require('../config')
const db = require("quick.db")
const cl = new db.table("Color")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const agu = new db.table("Guildupdate")

module.exports = {
    name: 'guildUpdate',
    once: false,

    async execute(client, oldGuild, newGuild) {

        if (oldGuild === newGuild) return;
        let guild = newGuild

        let color = cl.fetch(`color_${guild.id}`)
        if (color == null) color = config.app.color

        if (agu.get(`guildupdate_${guild.id}`) === true) {

            const action = await guild.fetchAuditLogs({type: "GUILD_UPDATE"}).then(audits => audits.entries.first())
            if (action.executor.id === client.user.id) return;

            let perm = config.app.owners == action.executor.id || config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}`) === true
            if (perm) {
                return
            } else if (!perm) {
                if (punish.get(`sanction_${guild.id}`) === "ban") {
                    guild.members.ban(action.executor.id, { reason: `Anti Guild Update` })

                } else if (punish.get(`sanction_${guild.id}`) === "derank") {

                    guild.members.resolve(action.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            guild.members.resolve(action.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${guild.id}`) === "kick") {

                    guild.members.kick(action.executor.id, { reason: `Anti Guild Update` })
                }

                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} a apporter des \`modifications au serveur\`, **il a été sanctionné**`)
                embed.setColor(color)

                const channel = client.channels.cache.get(rlog.fetch(`${guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)

                if (oldGuild.name !== newGuild.name) await newGuild.setName(oldGuild.name).catch(() => false)
                if (oldGuild.iconURL({ dynamic: true }) !== newGuild.iconURL({ dynamic: true })) await newGuild.setIcon(oldGuild.iconURL({ dynamic: true })).catch(() => false)
                if (oldGuild.bannerURL() !== newGuild.bannerURL()) await newGuild.setBanner(oldGuild.bannerURL()).catch(() => false)
                if (oldGuild.position !== newGuild.position) await newGuild.setChannelPositions([{ channel: oldGuild.id, position: oldGuild.position }]).catch(() => false)
                if (oldGuild.systemChannel !== newGuild.systemChannel) await newGuild.setSystemChannel(oldGuild.systemChannel).catch(() => false)
                if (oldGuild.systemChannelFlags !== newGuild.systemChannelFlags) await newGuild.setSystemChannelFlags(oldGuild.systemChannelFlags).catch(() => false)
                if (oldGuild.verificationLevel !== newGuild.verificationLevel) await newGuild.setVerificationLevel(oldGuild.verificationLevel).catch(() => false)
                if (oldGuild.widget !== newGuild.widget) await newGuild.setWidget(oldGuild.widget).catch(() => false)
                if (oldGuild.splashURL !== newGuild.splashURL) await newGuild.setSplash(oldGuild.splashURL).catch(() => false)
                if (oldGuild.rulesChannel !== newGuild.rulesChannel) await newGuild.setRulesChannel(oldGuild.rulesChannel).catch(() => false)
                if (oldGuild.publicUpdatesChannel !== newGuild.publicUpdatesChannel) await newGuild.setPublicUpdatesChannel(oldGuild.publicUpdatesChannel).catch(() => false)
                if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) await newGuild.setDefaultMessageNotifications(oldGuild.defaultMessageNotifications).catch(() => false)
                if (oldGuild.afkChannel !== newGuild.afkChannel) await newGuild.setAFKChannel(oldGuild.afkChannel).catch(() => false)
                if (oldGuild.region !== newGuild.region) await newGuild.setRegion(oldGuild.region).catch(() => false)
                if (oldGuild.afkTimeout !== newGuild.afkTimeout) await newGuild.setAFKTimeout(oldGuild.afkTimeout).catch(() => false)
            }
        }
    }
}