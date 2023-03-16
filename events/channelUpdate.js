const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const wl = new db.table("Whitelist")
const acu = new db.table("antichannelupdate")
const config = require('../config')

module.exports = {
    name: 'channelUpdate',
    once: false,

    async execute(client, oldChannel, newChannel) {

        const audit = await oldChannel.guild.fetchAuditLogs({type: "CHANNEL_UPDATE"}).then((audit) => audit.entries.first())
        if (audit.executor.id === client.user.id) return

        if (acu.fetch(`config.${oldChannel.guild.id}.antichannelupdate`) == true) {

            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${oldChannel.guild.id}.${audit.executor.id}.wl`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            if (audit.action == "CHANNEL_UPDATE" || audit.action == "CHANNEL_OVERWRITE_UPDATE") {
                // edit

                try{  
                    if (oldChannel.name !== newChannel.name) await newChannel.setName(oldChannel.name)
                    if (oldChannel.parentId !== newChannel.parentId) await newChannel.setParent(oldChannel.parentId)
                    if (oldChannel.rawPosition !== newChannel.rawPosition) await newChannel.setPosition(oldChannel.rawPosition)
                    if (oldChannel.bitrate !== newChannel.bitrate) await newChannel.setBitrate(oldChannel.bitrate)
                    if (oldChannel.userLimit !== newChannel.userLimit) await newChannel.setUserLimit(oldChannel.userLimit)
                    if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) await newChannel.setRateLimitPerUser(oldChannel.rateLimitPerUser)
                }catch(e){}

                if (punish.get(`sanction_${oldChannel.guild.id}`) === "ban") {
                    oldChannel.guild.members.ban(audit.executor.id, { reason: `AntiChannel Update` })

                } else if (punish.get(`sanction_${oldChannel.guild.id}`) === "derank") {

                    oldChannel.guild.members.resolve(audit.executor.id).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            oldChannel.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${oldChannel.guild.id}`) === "kick") {

                    oldChannel.guild.members.kick(audit.executor.id, { reason: `AntiChannel Update` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`modifié\` un salon, il a été sanctionné`)
                    .setTimestamp()
                const channel = client.channels.cache.get(rlog.fetch(`${oldChannel.guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}