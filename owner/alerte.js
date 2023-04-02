const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")
const alertefunny = new db.table("AlertePerm")
const cl = new db.table("Color")
const footer = config.app.footer


module.exports = {
    name: 'alerte',
    usage: 'alerte',
    description: `Permet de configuré les alertes.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let alerteadmin = db.get(`adminping_${message.guild.id}`)
            if (alerteadmin == true) alerteadmin = "Activé"
            if (alerteadmin == false) alerteadmin = "Désactivé"
            if (alerteadmin == null) alerteadmin = "Non Configuré"

            let alerteban = db.get(`banping_${message.guild.id}`)
            if (alerteban == true) alerteban = "Activé"
            if (alerteban == false) alerteban = "Désactivé"
            if (alerteban == null) alerteban = "Non Configuré"

            let alerterole = db.get(`roleping_${message.guild.id}`)
            if (alerterole == true) alerterole = "Activé"
            if (alerterole == false) alerterole = "Désactivé"
            if (alerterole == null) alerterole = "Non Configuré"

            let alertesalon = `<#${alertefunny.get(`${message.guild.id}.alerteperm`)}>`
            if (alertesalon == null) alertesalon = "Non Configuré"

            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration des Alertes Permissions`)
                .setDescription(`__Alertes actuelles:__\n\nAlerte Admin: __${alerteadmin}__\nAlerte Ban: __${alerteban}__\n Alerte Role: __${alerterole}__\n\n**Salon d'alerte:** ${alertesalon}`)
                .setColor(color)
                .setFooter({ text: `Si vous avez apporté des modifications refaite la commande pour actualiser ce message` })



            const panelselect = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('Funny')
                    .setPlaceholder(`Alerte Permission`)
                    .addOptions([
                        {
                            label: 'Activer les 3',
                            value: 'all',
                            emoji: '986267997717020712',
                        },
                        {
                            label: 'Administrateur',
                            value: 'admin',
                            emoji: '957098052693422111',
                        },
                        {
                            label: 'Ban',
                            value: 'ban',
                            emoji: '957097615147810956',
                        },
                        {
                            label: 'Role',
                            value: 'role',
                            emoji: '963584426787340348',
                        },
                        {
                            label: 'Réinitialiser',
                            value: 'funnyoff',
                            emoji: '957097853694664746',
                        }
                    ])
            )

            message.channel.send({ embeds: [embed], components: [panelselect] }).then(async msg => {

                //Ping admin
                const adminpingembed = new Discord.MessageEmbed()
                    .setDescription(`**Voulez vous prévenir les owners lorsqu'une permission __Administrateur__ sera ajoutée ?**`)
                    .setColor(color)

                const adminpingrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Choisissez une option`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'admon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'admoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Ping ban
                const banpingembed = new Discord.MessageEmbed()
                    .setDescription(`**Voulez vous prévenir les owners lorsqu'une permission __Bannir des membres__ sera ajoutée ?**`)
                    .setColor(color)

                const banpingrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Choisissez une option`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'banon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'banoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )


                //Ping role
                const rolepingembed = new Discord.MessageEmbed()
                    .setDescription(`**Voulez vous prévenir les owners lorsqu'une permission __Gérer les roles__ sera ajoutée ?**`)
                    .setColor(color)

                const rolepingrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Choisissez une option`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'roleon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'roleoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                const collectorX = message.channel.createMessageComponentCollector({
                    componentType: "SELECT_MENU",
                    filter: (i => i.user.id === message.author.id)
                });


                collectorX.on("collect", async (f) => {
                    f.deferUpdate().catch(() => false)
                    const value = f.values[0];
                    //
                    if (value === "all") {

                        db.set(`adminping_${message.guild.id}`, true)
                        db.set(`banping_${message.guild.id}`, true)
                        db.set(`roleping_${message.guild.id}`, true)
                        msg.channel.send({ content: `Les ajouts de roles contenant la permission \`Admin\`, \`Ban\`, \`Role\` seront désormais ping dans le salon d'arlerte` }).then(msg => {
                            setTimeout(() => msg.delete(), 7000)
                        })
                    }

                    //
                    if (value === "funnyoff") {

                        db.set(`adminping_${message.guild.id}`, false)
                        db.set(`banping_${message.guild.id}`, false)
                        db.set(`roleping_${message.guild.id}`, false)
                        msg.channel.send({ content: `Toutes les alertes ont étaient désactivées` }).then(msg => {
                            setTimeout(() => msg.delete(), 7000)
                        })
                    }

                    //retour
                    if (value === "retour") {

                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }
                    //admin ping
                    if (value === "admin") {

                        msg.edit({ embeds: [adminpingembed], components: [adminpingrow] })
                    }

                    if (value === "admon") {

                        db.set(`adminping_${message.guild.id}`, true)
                        msg.channel.send({ content: `Les ajouts de roles contenant la permission \`Admin\` seront désormais ping dans le salon d'arlerte` }).then(msg => {
                            setTimeout(() => msg.delete(), 6000)
                        })
                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }

                    if (value === "admoff") {

                        db.set(`adminping_${message.guild.id}`, false)
                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }

                    //ban ping


                    if (value === "ban") {

                        msg.edit({ embeds: [banpingembed], components: [banpingrow] })
                    }

                    if (value === "banon") {

                        db.set(`banping_${message.guild.id}`, true)
                        msg.channel.send({ content: `Les ajouts de roles contenant la permission \`Bannir des membres\` seront désormais ping dans le salon d'arlerte` }).then(msg => {
                            setTimeout(() => msg.delete(), 6000)
                        })
                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }

                    if (value === "banoff") {

                        db.set(`banping_${message.guild.id}`, false)
                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }

                    //role ping


                    if (value === "role") {

                        msg.edit({ embeds: [rolepingembed], components: [rolepingrow] })
                    }

                    if (value === "roleon") {

                        db.set(`roleping_${message.guild.id}`, true)
                        msg.channel.send({ content: `Les ajouts de roles contenant la permission \`Role\` seront désormais ping dans le salon d'arlerte` }).then(msg => {
                            setTimeout(() => msg.delete(), 6000)
                        })
                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }

                    if (value === "roleoff") {

                        db.set(`roleping_${message.guild.id}`, false)
                        msg.edit({ embeds: [embed], components: [panelselect] })
                    }
                })
            })
        }
    }
}