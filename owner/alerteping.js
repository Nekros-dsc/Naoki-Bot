const Discord = require("discord.js")
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")
const cl = new db.table("Color")

module.exports = {
    name: 'alerteping',
    usage: 'alerteping',
    description: `Permet de choisir quel role sera ping lorsqu'une perm admin sera ajouté.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (!args[0]) {

                const embed = new Discord.MessageEmbed()
                    .setTitle('Alerte Permissions')
                    .setDescription(`Quel role souhaitez vous mentionner lors d'un ajout de permissions administrateurs`)
                    .setColor(color)

                const alerteping = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('everyone')
                            .setLabel('@everyone')
                            .setStyle('DANGER')
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('here')
                            .setLabel('@here')
                            .setStyle('DANGER')
                    )

                message.channel.send({ embeds: [embed], components: [alerteping] }).then(async msg => {
                    const filter = m => message.author.id === m.author.id;
                    const collector = message.channel.createMessageComponentCollector({
                        componentType: "BUTTON",
                        filter: (i => i.user.id === message.author.id)
                    })
                    collector.on(`collect`, async (cld) => {
                        if (cld.user.id !== message.author.id) return;
                        cld.deferUpdate().catch(() => false)

                        if (cld.customId === "everyone") {
                            db.set(`role_${message.guild.id}`, "@everyone")
                            message.reply({ content: `**@Everyone** sera désormais ping à chaque ajout de permissions administrateurs`, ephemeral: true }).then(msg => {
                                setTimeout(() => msg.delete(), 6000)
                            }
                            )
                        }
                        else if (cld.customId === "here") {
                            db.set(`role_${message.guild.id}`, "@here")
                            message.reply({ content: `**@Here** sera désormais ping à chaque ajout de permissions administrateurs`, ephemeral: true }).then(msg => {
                                setTimeout(() => msg.delete(), 6000)
                            })
                        }
                    })
                })
            }
            if (args[0]) {

                let role = args[0]

                if (!role) return message.channel.send({ content: `Merci de spécifiez le rôle à ajouter` })

                message.channel.send({ content: `Le role ${role} sera désormais ping à chaque ajout de **permissions dangereuses**` })
                db.set(`role_${message.guild.id}`, role)

            }
        }
    }
}