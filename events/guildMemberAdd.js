const Discord = require('discord.js')
const moment = require('moment');
const config = require('../config')
const db = require("quick.db")
const cl = new db.table("Color")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const lock = new db.table("Serverlock")
const atb = new db.table("Antibot")

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(client, member) {

        let color = cl.fetch(`color_${member.guild.id}`)
        if (color == null) color = config.app.color

        
        let rr = member.guild.roles.cache.get(db.get(`joinrole_${member.guild.id}`))
        if(rr) member.roles.add(rr.id)


        if (lock.get(`serverlock_${member.guild.id}`) === "lock") {
            member.kick("Serveur Vérouillé")
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${member} à été **kick** pour avoir \`rejoint pendant que le serveur était verrouillé\``)
            const channel = client.channels.cache.get(rlog.fetch(`${member.guild.id}.raidlog`))
            if (channel) channel.send({ embeds: [embed] }).catch(() => false)
        }

        if (db.get(`blacklist.${member.id}`)) {

            member.send({ content: `Vous etes blacklist de **${member.guild.name}** vous ne pouvez pas rejoindre le serveur` })
            member.guild.members.ban(member.id, { reason: `Blacklist` })
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${member} a rejoit en étant __blacklist__, il à été **ban**`)
            const channel = client.channels.cache.get(rlog.fetch(`${member.guild.id}.raidlog`))
            if (channel) channel.send({ embeds: [embed] }).catch(() => false)
        }


        if (member.user.bot) {

            if (atb.get(`config.${member.guild.id}.antibot`) === true) {

                const action = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
                if (action.executor.id === client.user.id) return;

                let perm = config.app.owners == action.executor.id || config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}`)

                if (!perm) {

                    member.kick('Antibot')

                    if (punish.get(`sanction_${member.guild.id}`) === "ban") {
                        member.guild.members.ban(action.executor.id, { reason: `Anti Bot` })

                    } else if (punish.get(`sanction_${member.guild.id}`) === "derank") {

                        member.guild.members.resolve(action.executor).roles.cache.forEach(role => {
                            if (role.name !== '@everyone') {
                                member.guild.members.resolve(action.executor).roles.remove(role).catch(() => false)
                            }
                        })

                    } else if (punish.get(`sanction_${member.guild.id}`) === "kick") {

                        member.guild.members.kick(action.executor.id, { reason: `Anti bot` })
                    }

                    const embed = new Discord.MessageEmbed()
                        .setDescription(`<@${action.executor.id}> a ajouté un \`bot\` au serveur\nBot ajouté: <@${member.id}>`)
                        .setTimestamp()
                    const channel = client.channels.cache.get(db.fetch(`${member.guild.id}.raidlog`))
                    if (channel) channel.send({ embeds: [embed] }).catch(() => false)

                }
            }
        }

        if (member.user) {

            let joinsettings = db.get(`joinsettings_${member.guild.id}`)
            if (joinsettings == null) joinsettings == true

            if (joinsettings === true) {

                const messagejoin = db.fetch(`messagebvn_${member.guild.id}`)

                const salonbvn = db.fetch(`salonbvn_${member.guild.id}`)

                const premiumTier = {
                    NONE: 0,
                    TIER_1: 1,
                    TIER_2: 2,
                    TIER_3: 3,
                };

                const content = messagejoin
                    .replaceAll('{MemberName}', member)
                    .replaceAll('{MemberMention}', `<@${member.id}>`)
                    .replaceAll('{MemberTag}', member.user.tag)
                    .replaceAll('{MemberID}', member.id)
                    .replaceAll('{Server}', member.guild)
                    .replaceAll('{MemberCount}', member.guild.memberCount)
                    .replaceAll('{ServerBoostsCount}', `${member.guild.premiumSubscriptionCount || '0'}`)
                    .replaceAll('{ServerLevel}', `${premiumTier[member.guild.premiumTier]}`)
                    .replaceAll('{VocalMembersCount}', member.guild.members.cache.filter(m => m.voice.channel).size)
                    .replaceAll('{OnlineMembersCount}', member.guild.presences.cache.filter((presence) => presence.status !== "offline").size)

                const logchannel = client.channels.cache.get(salonbvn)
                if (logchannel) logchannel.send({ content: content }).catch(() => false)

                let joinsettingsmp = db.get(`joinsettingsmp_${member.guild.id}`)
                if (joinsettingsmp == null) joinsettingsmp == true

                if (joinsettingsmp === true) {

                    const messagejoin = db.fetch(`messagebvnmp_${member.guild.id}`)

                    const contentt = messagejoin
                        .replaceAll('{MemberName}', member)
                        .replaceAll('{MemberMention}', `<@${member.id}>`)
                        .replaceAll('{MemberTag}', member.user.tag)
                        .replaceAll('{MemberID}', member.id)
                        .replaceAll('{Server}', member.guild)
                        .replaceAll('{MemberCount}', member.guild.memberCount)
                        .replaceAll('{ServerBoostsCount}', `${member.guild.premiumSubscriptionCount || '0'}`)
                        .replaceAll('{ServerLevel}', `${premiumTier[member.guild.premiumTier]}`)
                        .replaceAll('{VocalMembersCount}', member.guild.members.cache.filter(m => m.voice.channel).size)
                        .replaceAll('{OnlineMembersCount}', member.guild.presences.cache.filter((presence) => presence.status !== "offline").size)

                    member.send({ content: contentt }).catch(() => false)

                }


           
            }
        }
    }}
