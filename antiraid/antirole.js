const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const atr = new db.table("antirolecreate")
const ard = new db.table("antiroledelete")
const aru = new db.table("antiroleupdate")

module.exports = {
    name: 'antirole',
    usage: 'antirole',
    description: `Permet de configurer l'antirole.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {

                atr.set(`config.${message.guild.id}.antirolecreate`, true)
                ard.set(`config.${message.guild.id}.antiroledelete`, true)
                ard.set(`config.${message.guild.id}.antiroledelete`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antirole** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            }

            if (args[0] == 'off') {

                atr.set(`config.${message.guild.id}.antirolecreate`, false)
                ard.set(`config.${message.guild.id}.antiroledelete`, false)
                ard.set(`config.${message.guild.id}.antiroledelete`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'antirole** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            }

            if (args[0] == 'create') {

                if (args[1] == 'on') {

                    atr.set(`config.${message.guild.id}.antirolecreate`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirole create** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    atr.set(`config.${message.guild.id}.antirolecreate`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirole create** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

            } else if (args[0] == 'delete') {

                if (args[1] == 'on') {

                    ard.set(`config.${message.guild.id}.antiroledelete`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirole Delete** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    ard.set(`config.${message.guild.id}.antiroledelete`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirole Delete** est maintenant **désactivé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }
            } else if (args[0] == 'update') {

                if (args[1] == 'on') {

                    aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirole Update** est maintenant **activé**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed] })
                }

                else if (args[1] == 'off') {

                    aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**L'antirole Update** est maintenant **désactivé**`)
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
