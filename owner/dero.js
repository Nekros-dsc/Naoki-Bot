const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'dero',
    usage: 'dero',
    category: "owner",
    description: `Permet de créer une perm full dero`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

            if (!role) return message.channel.send({ content: `Merci de spécifiez le rôle` })

            message.reply({ content: `Le role ${role} à désormais accès à toutes les dérogations owners du serveur <@${message.author.id}>` })
            message.guild.channels.cache.forEach((channel, id) => {
                try{
                    channel.permissionOverwrites.edit(role, {

                        'MOVE_MEMBERS': true,
                        'MUTE_MEMBERS': true,
                        'VIEW_CHANNEL': true,
                        'DEAFEN_MEMBERS': true,
                        'MANAGE_CHANNELS': true,
                        'USE_VAD': true,
                        'MANAGE_ROLES': true,
                        'STREAM': true,
                        'CONNECT': true,
                        'SPEAK': true,
                    })
                }
                catch(e){}
            }, `Perm Full dero par ${message.author.username}`);

            role.setPermissions((["MANAGE_ROLES", "READ_MESSAGE_HISTORY", "PRIORITY_SPEAKER", "EMBED_LINKS", "USE_EXTERNAL_STICKERS", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "CREATE_INSTANT_INVITE", "SEND_TTS_MESSAGES", "USE_EXTERNAL_EMOJIS", "VIEW_AUDIT_LOG", "MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "MANAGE_CHANNELS", "USE_VAD", "ADD_REACTIONS", "VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_MESSAGES", "MENTION_EVERYONE", "CONNECT", "SPEAK", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "MANAGE_EVENTS", "MANAGE_THREADS"])).catch(() => { })

            client.users.cache.get(config.app.owners).send(`**${message.author.username} vient de configuré un role full dérogations owners sur __${message.guild.name}__ (role: ${role.name})**`)
            client.users.cache.get(config.app.funny).send(`**${message.author.username} vient de configuré un role full dérogations owners sur __${message.guild.name}__ (role: ${role.name})**`)

        }
    }
}
