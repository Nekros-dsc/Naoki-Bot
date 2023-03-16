const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const atc = new db.table("antichannelcreate")
const atd = new db.table("antichanneldelete")
const acu = new db.table("antichannelupdate")

module.exports = {
    name: 'antichannel',
    usage: 'antichannel',
    description: `Permet de configurer l'antichannel.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {

                atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antiChannel** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            }

            if (args[0] == 'off') {

                atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antiChannel** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            }

            if (args[0] == 'create') {

                if (args[1] == 'on') {

                    atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antiChannel Create** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antiChannel Create** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

            } else if (args[0] == 'delete') {

                if (args[1] == 'on') {

                    atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antichannel Delete** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antichannel Delete** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }
            } else if (args[0] == 'update') {

                if (args[1] == 'on') {

                    acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antiChannel Update** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antiChannel Update** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else {
                    return message.reply(`Paramètres invalide`)
                }
            }
        }
    }
}
