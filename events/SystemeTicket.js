const { Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, Message, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js')
const messageCreate = require('./messageCreate');
const config = require('../config')
const db = require('quick.db')
const cl = new db.table("Color")
const ct = new db.table("CategorieTicket")
const moment = require('moment')
const fs = require('fs')
const ticketlogg = new db.table("ticketlog")
const dbrolestaff = new db.table("Rolestaff")
const emote = require('../emotes.json')

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction, message) {

        let color = cl.fetch(`color_${interaction.guild.id}`)
        if (color == null) color = config.app.color

        if (!interaction.isSelectMenu()) return;
        const row = new MessageActionRow()
            .addComponents(

                new MessageSelectMenu()

                    .setCustomId('ticket')
                    .setPlaceholder('Selectionner pour fermé le ticket !')
                    .addOptions([
                        {
                            label: '🔒 Fermé le ticket',
                            description: 'Fermé le Ticket',
                            value: 'delete',
                        }
                    ])
            );

        const ticketlog = ticketlogg.get(`${interaction.guild.id}.ticketlog`)
        let rolestaff = dbrolestaff.get(`rolestaff_${interaction.guild.id}`)
        if (rolestaff == null) rolestaff = client.user.id

        const deleteticket = new MessageActionRow()
            .addComponents(

                new MessageSelectMenu()

                    .setCustomId('ticketdelete')
                    .setPlaceholder('Confirmation')
                    .addOptions([
                        {
                            label: '🔒 Supprimé le ticket',
                            description: 'Supprime le salon',
                            value: 'ticketdelete',
                        },
                        {
                            label: `📝 Transcript`,
                            description: 'je vous envoie le transcript de ce ticket',
                            value: 'transcript',
                        }
                    ])
            );



        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)

        if (interaction.customId === "ticket") {

            if (interaction.values[0] == "delete") {

                interaction.reply({ content: `Veuilez confirmer la fermeture de votre ticket`, ephemeral: true })

                const embed = new Discord.MessageEmbed()
                    .setTitle('Fermé le ticket ?')
                    .setDescription(`<@${interaction.member.id}> Etes vous sur de vouloir fermé ce ticket ?`)
                    .setFooter({ text: `⚠️ Le salon sera immédiatement supprimé` })
                    .setColor(color)
                interaction.channel.send({ embeds: [embed], components: [deleteticket] })
            }
        }

        if (interaction.customId === "ticketdelete") {

            if (interaction.values[0] == "ticketdelete") {

                interaction.reply({ content: `Votre ticket sera supprimé dans **3 secondes**`, ephemeral: true })

                const fetchAll = require('discord-fetch-all');

                const allMessages = await fetchAll.messages(interaction.channel, {
                    reverseArray: true,
                    userOnly: true,
                    botOnly: false,
                    pinnedOnly: false,
                });

                var results = allMessages.map(msg => `${moment(msg.createdTimestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM")}] - ${msg.author.username} - (${msg.author.id}) : ${msg.content}`).join('\n')

                const hastebin = require("hastebin-gen");

                hastebin(`Voici les logs du salon ${interaction.channel.name} - ${interaction.channel.id} sur le serveur ${interaction.guild.name}\n\u200b\n` + results, {
                    extension: "diff",
                    url: 'https://haste.chaun14.fr/'
                }).then(haste => {
                    fs.writeFile(`./${interaction.channel.id}_${interaction.member.id}`, results, () =>
                        setTimeout(function () {
                            fs.unlink(`./${interaction.channel.id}_${interaction.member.id}`, (err) => {
                                if (err) throw err;
                            });
                        }, 1000))

                    client.channels.cache.get(ticketlog).send({
                        content: `Voici le **transcript** du ticket: __${interaction.channel.name}__`,
                        files: [{
                            attachment: `./${interaction.channel.id}_${interaction.member.id}`,
                            name: `log${interaction.channel.id}.txt`
                        }],

                    })
                })
                .catch(() => false)
                setTimeout(() => interaction.channel.delete(), 3000)

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${interaction.member.id}> vient de fermé un ticket \nTicket Fermé : __${interaction.channel.name}__`)
                    .setColor(color)
                const ticketchannel = client.channels.cache.get(ticketlog)
                        if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)
            }
        }

        if (interaction.customId === "ticketdelete") {
            if (interaction.values[0] == "transcript") {

                interaction.reply({ content: `Transcript en cours`, ephemeral: true })

                const msgd = await interaction.channel.send({
                    content: `${emote.owner.warn} Récupération des messages, cela peut prendre un certain temps...`,
                }).catch(() => false)

                const fetchAll = require('discord-fetch-all');


                const allMessages = await fetchAll.messages(interaction.channel, {
                    reverseArray: true,
                    userOnly: true,
                    botOnly: false,
                    pinnedOnly: false,
                });


                var results = allMessages.map(msg => `${moment(msg.createdTimestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM")}] - ${msg.author.username} - (${msg.author.id}) : ${msg.content}`).join('\n')

                const hastebin = require("hastebin-gen");


                hastebin(`Voici les logs du salon ${interaction.channel.name} - ${interaction.channel.id} sur le serveur ${interaction.guild.name}\n\u200b\n` + results, {
                    extension: "diff",
                    url: 'https://haste.chaun14.fr/'
                }).then(haste => {
                    fs.writeFile(`./${interaction.channel.id}_${interaction.member.id}`, results, () =>
                        setTimeout(function () {
                            fs.unlink(`./${interaction.channel.id}_${interaction.member.id}`, (err) => {
                                if (err) throw err;
                            });
                        }, 1000))
                    msgd.edit({ content: `Je vous ai envoyé le **transcript** du salon en message privé` })

                    interaction.member.send({
                        content: `Voici le **transcript** du salon que vous pouvez télécharger ou le haste : ${haste} `,
                        files: [{
                            attachment: `./${interaction.channel.id}_${interaction.member.id}`,
                            name: `log${interaction.channel.id}.txt`
                        }],

                    })
                    // 1000ms = 1sec

                }).catch(error => {

                    console.error(error);


                });

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${interaction.member.id}> vient de récuperer le Transcript de son ticket \nTicket : __${interaction.channel.name}__`)
                    .setColor(color)
                const ticketchannel = client.channels.cache.get(ticketlog)
                        if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)
            }

            if (interaction.values[0] == "delete") {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Fermé le ticket ?')
                    .setDescription(`<@${interaction.member.id}> Etes vous sur de vouloir fermé ce ticket ?`)
                    .setFooter({ text: `⚠️ Le salon sera imédiatement supprimé` })
                    .setColor(color)
                interaction.channel.send({ embeds: [embed], components: [deleteticket] })
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({ content: '❌ Vous avez déja un ticket d\'ouvert sur le serveur.', ephemeral: true })

            if (interaction.values[0] == "open") {
                
                let categorie = ct.fetch(`${interaction.guild.id}.categorie`)
                if (categorie === null) {
                    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        topic: `${interaction.user.id}`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [`VIEW_CHANNEL`]
                            },
                            {
                                id: rolestaff,
                                allow: [`VIEW_CHANNEL`]
                            },
                            {
                                id: interaction.user.id,
                                allow: [`VIEW_CHANNEL`]
                            },
                        ]
                    }).then((c) => {
                        
                        const ticket = new MessageEmbed()
                            .setTitle('📧・Ticket')
                            .setDescription(`<@${interaction.member.id}> Veuillez bien détailler votre requète pour qu\'un administrateur du serveur vienne prendre en charge votre ticket.`)
                            .setFooter({ text: 'Support' })
                            .setColor(color)
                        c.send({ embeds: [ticket], components: [row] })
                        interaction.reply({ content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`, ephemeral: true })

                        const embed = new Discord.MessageEmbed()
                            .setDescription(`<@${interaction.member.id}> vient d'ouvrir un ticket`)
                            .setColor(color)
                        const ticketchannel = client.channels.cache.get(ticketlog)
                        if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)

                    })
                } else {
                    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        topic: `${interaction.user.id}`,
                        parent: `${categorie}`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [`VIEW_CHANNEL`]
                            },
                            {
                                id: interaction.user.id,
                                allow: [`VIEW_CHANNEL`]
                            },
                            {
                                id: rolestaff,
                                allow: [`VIEW_CHANNEL`]
                            },

                        ]
                    }).then((c) => {
                        const ticket = new MessageEmbed()
                            .setTitle('📧・Ticket')
                            .setDescription(`<@${interaction.member.id}> Veuillez bien détailler votre requète pour qu\'un administrateur du serveur vienne prendre en charge votre ticket.`)
                            .setFooter({ text: 'Support' })
                            .setColor(color)
                        c.send({ embeds: [ticket], components: [row] })
                        interaction.reply({ content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`, ephemeral: true }).catch(() => false)

                        const embed = new Discord.MessageEmbed()
                            .setDescription(`<@${interaction.member.id}> vient d'ouvrir un ticket`)
                            .setColor(color)
                        const ticketchannel = client.channels.cache.get(ticketlog)
                        if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)

                    })
                }
            } else if (interaction.values[0] == "rien") {

                interaction.reply({ content: `Action annulée`, ephemeral: true })
            }
        }

        else if (interaction.values[0] == "rien") {

            interaction.reply({ content: `Action annulée`, ephemeral: true })
        }
    }
}