const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const footer = config.app.footer

module.exports = {
    name: 'voiceunmute',
    usage: 'voiceunmute <@>',
    description: `Permet de mute vocal un membre sur le serveur.`,
    async execute(client, message, args) {

        const perm1 = p1.fetch(`perm1_${message.guild.id}`)
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const muteUser =
                message.guild.members.cache.get(message.mentions.users.first().id) ||
                message.guild.members.cache.get(args[0]);

            const muteReason = args.join(" ").slice(23);

            if (!muteUser.voice.serverMute) {
                return message.channel
                    .send("Le membre n'est pas dans un salon vocal ou est déjà unmute vocal.")
            }

            try {
                muteUser.voice.setMute(false, "muteReason");
            } catch (err) {
                console.error(err);
                message
                    .reply("Je n'ai pas pu désactiver le son de cet utilisateur, veuillez vérifier mes permissions et réessayer.\n" + err)
            }

            try {
                muteUser.user.send(
                    `Vous avez été **unmute** sur **${message.guild.name}**, Raison: **${muteReason || "Aucune"}**.`
                );
            } catch (err) {
                console.err(err);
                message
                    .reply("Impossible d'envoyer un message privé à ce membre...")
            }

            message.channel.send(
                `**${muteUser.user.tag}** a été unmute avec succès sur le serveur. Raison: **${muteReason || "Aucun"
                }**. `
            )

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`voiceunmute\` ${muteUser}\nRaison: ${muteReason}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
        }
    }
}