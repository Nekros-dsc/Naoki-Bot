const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const fs = require('fs')
const moment = require('moment')
 const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'theme',
    usage: 'theme',
    description: `Permet de changer le theme couleur du bot`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (!args[0]) {
                var channel = message.channel;
            } else {
                var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            };

            const theme = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('theme')
                    .setPlaceholder(`Choisissez une couleur`)
                    .addOptions([
                        {
                            label: 'Rouge',
                            value: 'red',
                            emoji: '',
                        },
                        {
                            label: 'Bleu',
                            value: 'blue',
                            emoji: '',
                        },
                        {
                            label: 'Vert',
                            value: 'green',
                            emoji: '',
                        },
                        {
                            label: 'Jaune',
                            value: 'yellow',
                            emoji: '',
                        },
                        {
                            label: 'Blanc',
                            value: 'white',
                            emoji: '',
                        },
                        {
                            label: 'Noir',
                            value: 'black',
                            emoji: '',
                        },
                        {
                            label: 'Gris',
                            value: 'grey',
                            emoji: '',
                        },
                        {
                            label: 'Aqua',
                            value: 'aqua',
                            emoji: '',
                        },
                        {
                            label: 'Orange',
                            value: 'orange',
                            emoji: '',
                        },
                        {
                            label: 'Rose',
                            value: 'rose',
                            emoji: '',
                        },
                        {
                            label: 'Violet',
                            value: 'violet',
                            emoji: '',
                        },
                        {
                            label: 'Défaut',
                            value: 'default',
                            emoji: '',
                        }
                    ])
            )


            const embedtheme = new Discord.MessageEmbed()

                .setTitle('Theme')
                .setDescription(`Choisissez la couleur qui sera utilisée pour le thème du bot`)
                .setColor(color)
                .setFooter({ text: `${footer}` })

            const ok = new Discord.MessageEmbed()
                .setTitle('Theme')
                .setDescription('Le Theme de votre bot à été mis à jour avec succès')
                .setColor(color)

            message.channel.send({ embeds: [embedtheme], components: [theme] }).then(async msg => {

                const collector = message.channel.createMessageComponentCollector({
                    componentType: "SELECT_MENU",
                    filter: (i => i.user.id === message.author.id)
                });
                collector.on("collect", async (collected) => {
                    collected.deferUpdate().catch(() => false)
                    const value = collected.values[0];

                    if (value === "red") {

                        const couleur = "ff0000"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }


                    if (value === "blue") {

                        const couleur = "0027ff"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "vert") {

                        const couleur = "05ff11"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "yellow") {

                        const couleur = "f6ff00"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "white") {

                        const couleur = "ffffff"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "black") {

                        const couleur = "000000"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "grey") {

                        const couleur = "4e4e50"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "aqua") {

                        const couleur = "00ffff"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "orange") {

                        const couleur = "ff9200"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "rose") {

                        const couleur = "be00ff"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "violet") {

                        const couleur = "6201ff"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                    if (value === "default") {

                        const couleur = "2f3136"

                        cl.set(`color_${message.guild.id}`, couleur)

                        msg.edit({ embeds: [ok], components: [theme] })

                    }

                })
            })
        }
    }
}
