const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const wl = new db.table("Whitelist")
const ard = new db.table("antiroledelete")
const config = require('../config')

module.exports = {
    name: 'roleDelete',
    once: false,

    async execute(client, role, oldRole, newRole) {

        const audit = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(async (audit) => audit.entries.first());

        if (ard.fetch(`config.${role.guild.id}.antiroledelete`) == true) {

            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${role.guild.id}.${audit.executor.id}.wl`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            if (audit.action == 'ROLE_DELETE') {

                if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                    role.guild.members.ban(audit.executor.id, { reason: `Antirole Delete` })

                } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {

                    role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            role.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {

                    role.guild.members.kick(audit.executor.id, { reason: `Antirole Delete` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`supprimé un role\`, il a été sanctionné`)
                    .setTimestamp()
                if (channel) client.channels.cache.get(rlog.fetch(`${role.guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }

            role.guild.roles.create({
                name: role?.name,
                color: role?.color,
                hoist: role?.hoist,
                permissions: role?.permissions,
                position: role?.position,
                mentionable: role?.mentionable,
                reason: 'Anti-Role'
            })
        }
    }
}
