const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const pgs = new db.table("PermGs")

module.exports = {
    name: 'addrole',
    usage: 'addrole',
    description: `Permet d'ajouter un role à un membre.`,
    async execute(client, message, args) {

        if (!args[0]) return message

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color


        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {
            let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!rMember) return

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

            if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)

            if (rMember.roles.highest.position > client.user.id) return message.channel.send(`1 rôle ajouté à 0 membre`)

            if (rMember.roles.cache.has(role.id)) return message.channel.send(`1 rôle ajouté à 0 membre`)

            if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id, `Rôle ajouté par ${message.author.tag}`);

            message.channel.send(`1 rôle ajouté à 1 membre`)

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`➕ <@${message.author.id}> à utilisé la commande \`addrole\` sur ${rMember}\nRole ajouté : ${role}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)


        } else if (message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`)) === true) {
            {

                let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                if (!rMember) return



                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])


                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)
                if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
                    return message.channel.send("1 rôle n'a pas pu être ajouté car il a des permissions dangereuses")
                }

                if (rMember.roles.highest.position > client.user.id) return message.channel.send(`1 rôle enlevé à 0 membre`)

                if (rMember.roles.cache.has(role.id)) return message.channel.send(`1 rôle ajouté à 0 membre`)

                if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id, `Rôle ajouté par ${message.author.tag}`);

                message.channel.send(`1 rôle ajouté à 1 membre`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`➕ <@${message.author.id}> à utilisé la commande \`addrole\` sur ${rMember}\nRole ajouté : ${role}`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}