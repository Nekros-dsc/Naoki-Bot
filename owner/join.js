const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../config.js")
const p = new db.table("Prefix")
const footer = config.app.footer
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const emote = require('../emotes.json')

module.exports = {
    name: 'join',
    usage: 'join',
    description: `Permet de configurer le role soutien.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (args[0] == 'settings') {

                try {

                    first_layer()
                    async function first_layer() {
                        let menuoptions = new MessageSelectMenu()
                            .setCustomId('MenuSelection')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Message Personnalisé",
                                    value: `msgperso`,
                                    emoji: "998562005155860510",
                                },
                                {
                                    label: 'MP Personnalisé',
                                    value: `mpperso`,
                                    emoji: "💬",
                                },
                                {
                                    label: "Activé le message de bienvenue",
                                    value: "activemodule",
                                    emoji: "972648521255768095",
                                },
                                {
                                    label: "Désactivé le message de bienvenue",
                                    value: "desactivemodule",
                                    emoji: "988389407730040863",
                                },
                                {
                                    label: "Activé le mp de bienvenue",
                                    value: "activemodulemp",
                                    emoji: "972648521255768095",
                                },
                                {
                                    label: "Désactivé le mp de bienvenue",
                                    value: "desactivemodulemp",
                                    emoji: "988389407730040863",
                                },
                                {
                                    label: 'Annulé',
                                    value: "Cancel",
                                    emoji: '988389407730040863',
                                },
                            ])


                        let color = cl.fetch(`color_${message.guild.id}`)
                        if (color == null) color = config.app.color

                        let pf = p.fetch(`prefix_${message.guild.id}`)
                        if (pf == null) pf = config.app.px

                        let onoffjoin = db.get(`joinsettings_${message.guild.id}`)
                        if (onoffjoin == true) onoffjoin = "Activé"
                        if (onoffjoin == false) onoffjoin = "Désactivé"
                        if (onoffjoin == null) onoffjoin = "Désactivé"

                        let onoffrole = db.get(`joinsettingsrole_${message.guild.id}`)
                        if (onoffrole == true) onoffrole = "Activé"
                        if (onoffrole == false) onoffrole = "Désactivé"
                        if (onoffrole == null) onoffrole = "Désactivé"

                        let onoffjoinmp = db.get(`joinsettingsmp_${message.guild.id}`)
                        if (onoffjoinmp == true) onoffjoinmp = "Activé"
                        if (onoffjoinmp == false) onoffjoinmp = "Désactivé"
                        if (onoffjoinmp == null) onoffjoinmp = "Désactivé"

                        let messagebvnn = db.get(`messagebvn_${message.guild.id}`)
                        if (messagebvnn == '[object Object]') messagebvnn = "Non configuré"
                        if (messagebvnn == null) messagebvnn = "Non configuré"

                        let mpjoin = db.get(`messagebvnmp_${message.guild.id}`)
                        if (mpjoin == '[object Object]') mpjoin = "Non configuré"
                        if (mpjoin == null) mpjoin = "Non configuré"

                        let joinrole = `<@&${db.get(`joinrole_${message.guild.id}`)}>`
                        if (joinrole == "<@&null>") joinrole = "Non configuré"

                        let salonbvn = `<#${db.get(`salonbvn_${message.guild.id}`)}>`
                        if (salonbvn == "<#null>") salonbvn = "Non configuré"

                        const MenuEmbed = new Discord.MessageEmbed()
                            .setTitle('Paramètres de Bienvenue')
                            .setDescription(`__**Choisissez les options lorsqu'un membre rejoindra le serveur**__`)

                            .addFields(
                                { name: 'Activé/Désactivé', value: `Message de Bienvenue: __**${onoffjoin}**__\n MP de Bienvenue: __**${onoffjoinmp}**__\nRole de bienvenue: __**${onoffrole}**__`, inline: true },
                                { name: 'Role de bienvenue', value: joinrole, inline: true },
                                { name: 'Salon de bienvenue', value: salonbvn, inline: true },
                            )
                            .addFields(
                                { name: 'MP de bienvenue', value: mpjoin, inline: false },
                                { name: 'Message de bienvenue', value: `${messagebvnn}`, inline: false },
                            )

                            .setColor(color)
                            .setFooter({ text: `Si vous avez apporté des modifications refaite la commande pour actualiser ce message` })

                        let used1 = false;

                        const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })

                        function menuselection(i) {
                            used1 = true;
                        }

                        //Event
                        let msg = menumsg

                        const antichannel = new MessageEmbed()
                            .setTitle(`Configuré le message de bienvenue`)
                            .setDescription("**Séléctionner l'option qui vous correspond**")
                            .setColor(color)
                            .setThumbnail('https://cdn.discordapp.com/attachments/904084986536276059/1003923893045698610/mp.gif')

                        const antichanneldelete = new MessageEmbed()
                            .setTitle(`Configuré le MP de bienvenue`)
                            .setDescription("**Indiquer quel message sera envoyé aux nouveau membres qui rejoindront le serveur**")
                            .setColor(color)
                            .setThumbnail('https://cdn.discordapp.com/attachments/904084986536276059/1003923893045698610/mp.gif')


                        let options = new MessageSelectMenu()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un Message",
                                    value: `active`,
                                    emoji: '✅',
                                },
                                {
                                    label: 'Réinitialiser',
                                    value: `desactive`,
                                    emoji: '❌',
                                },
                                {
                                    label: 'Retour',
                                    value: "Retour",
                                    emoji: "↩️",
                                },
                            ])




                        let AntiChannelDelete = new MessageSelectMenu()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un Message",
                                    value: `activedel`,
                                    emoji: '✅',
                                },
                                {
                                    label: 'Réinitialiser',
                                    value: `desactivedel`,
                                    emoji: '❌',
                                },
                                {
                                    label: 'Retour',
                                    value: "Retourdel",
                                    emoji: "↩️",
                                },
                            ])


                        let filter2 = (m) => m.author.id === message.author.id

                        let filter1 = (i) => i.user.id === message.author.id;
                        const col = await msg.createMessageComponentCollector({
                            filter: filter1,
                            componentType: "SELECT_MENU"
                        })

                        col.on("collect", async (i) => {
                            if (i.values[0] == "Cancel") {
                                menumsg.delete()
                            }
                            else if (i.values[0] === "msgperso") {
                                menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })
                                await i.deferUpdate().catch(() => false)
                            }
                            if (i.values[0] == "active") {
                                let link = db.fetch(`messagebvn_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send(`✅ |\`Un message \` est déjà setup`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)
                                }
                                else {
                                    await i.deferUpdate().catch(() => false)
                                    const oui = await message.channel.send(`Quel message doit être envoyé dans le salon de bienvenue lorsqu'un membre rejoindra le serveur (${pf}help msg pour afficher les variables)`)
                                    let collected = message.channel.awaitMessages({
                                        filter: m => m.author.id === message.author.id,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    })
                                        .then(collected => {
                                            oui.delete()

                                            const status = collected.first().content
                                            db.set(`messagebvn_${message.guild.id}`, status)
                                            collected.first().delete().catch(() => false)

                                            message.channel.send(`✅ |\`Le module message de bienvenue \` a été activé avec succès`).then(msg => {
                                                setTimeout(() => msg.delete(), 5000)
                                            }).catch(() => false);
                                        })
                                }

                            } else if (i.values[0] == "Retour") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                                await i.deferUpdate().catch(() => false)

                            } else if (i.values[0] == 'desactive') {
                                let link = db.fetch("msgperso_" + message.guild.id)
                                if (link == true) {
                                    //     db.set("support"+ message.guild.id , null)
                                    db.delete("messagebvn_" + message.guild.id)
                                    message.channel.send(`❌ |\`Le message de bienvenue \` vient d'être reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)

                                } else if (link == null) {
                                    message.channel.send(`❌ |\`Le message de bienvenue \` est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)
                                }

                            }

                            //Statut
                            else if (i.values[0] === "mpperso") {
                                menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })
                                await i.deferUpdate().catch(() => false)
                            } if (i.values[0] == "activedel") {
                                await i.deferUpdate().catch(() => false)
                                let link = db.fetch(`messagebvnmp_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send(`✅ |\`Les de mp de bienvenue \` sont déjà activés`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                } else {

                                    const ez = await message.channel.send(`Quel message doit être envoyé aux membres qui rejoindront le serveur (${pf}help msg pour afficher les variables)`)
                                    let collected = await message.channel.awaitMessages({
                                        filter: filter2,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    }).then(collected => {
                                        ez.delete()

                                        const status = collected.first().content
                                        db.set(`messagebvnmp_${message.guild.id}`, status)
                                        //  db.set("support"+ message.guild.id , true)
                                        message.channel.send(`✅ |\`Le mp de bienvenue à été set up \`Message: ${status}`).then(msg => {
                                            setTimeout(() => msg.delete(), 10000)
                                        })
                                        collected.first().delete().catch(() => false)
                                            .catch(() => false);
                                    })
                                }
                            } else if (i.values[0] == "Retourdel") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                                await i.deferUpdate().catch(() => false)

                            } else if (i.values[0] == 'desactivedel') {
                                let link = db.fetch(`support${message.guild.id}`)
                                if (link == true) {
                                    db.delete('status' + message.guild.id)
                                    message.channel.send(`❌ |\`Le mp de bienvenue \` vien d'être reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)


                                } else {
                                    message.channel.send(`❌ |\`Le mp de bienvenue \` est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)
                                }
                            }


                            //activé MSG
                            if (i.values[0] === "activemodule") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = db.fetch("joinsettings_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le join settings est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else {
                                    db.set("joinsettings_" + message.guild.id, true)
                                    return message.channel.send("✅ |Le join settings vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodule") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = db.fetch("joinsettings_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("joinsettings_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le join settings vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else return message.channel.send('✅ | Le join settings est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }

                            //activé mp
                            if (i.values[0] === "activemodulemp") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = db.fetch("joinsettingsmp_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le join settings est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else {
                                    db.set("joinsettingsmp_" + message.guild.id, true)
                                    return message.channel.send("✅ |Le join settings vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodulemp") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = db.fetch("joinsettingsmp_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("joinsettingsmp_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le join settings vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else return message.channel.send('✅ | Le join settings est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }

                        })
                    }
                }

                catch (e) {
                    console.log(e)
                    return message.channel.send({
                        embeds: [new MessageEmbed()
                            .setColor(color)
                            .setTitle("Une erreur est survenu")
                            .setDescription('Erreur intattenudu')
                        ]
                    });
                }
            }

            if (args[0] == 'role') {

                if (args[1] == 'on') {
                    message.channel.send({ content: `Role de bienvenue __activé__` })
                    db.set(`joinsettingsrole_${message.guild.id}`, true)
                    return
                }


                else if (args[1] == 'off') {
                    message.channel.send({ content: `Role de bienvenue __activé__` })
                    db.set(`joinsettingsrole_${message.guild.id}`, false)
                    return
                }

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: `Merci de spécifiez le rôle à ajouter` })
                if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) return message.channel.send({ content: `Le **joinrole** n'a pas pu etre configuré car le role séléctionné contient des permissions **Dangereuses**` })

                message.channel.send({ content: `Le role ${role} sera désormais automatiquement attribué aux nouveaux membres` })
                db.set(`joinrole_${message.guild.id}`, role.id)

            }


            if (args[0] == 'channel') {

                const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1] || message.channelId);
                if (args[1] == undefined) args[1] = `<#${message.channel.id}>`
                if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
                if (db.get(`salonbvn_${message.guild.id}`) === newChannel) return message.channel.send(`${emote.utilitaire.information}・__Nouveau salon de bienvenue :__ \`${db.get(`salonbvn_${message.guild.id}`)}\``)
                else {
                    db.set(`salonbvn_${message.guild.id}`, newChannel.id)
                    message.channel.send(`${emote.utilitaire.information}・__Nouveau salon de bienvenue :__ ${args[1]}`)

                    const logs = db.get(`salonbvn_${message.guild.id}`)

                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setTitle(`${message.author.tag} à défini ce salon commme salon de bienvenue`)
                        .setDescription(`${emote.utilitaire.information} Ce salon est désormais utilisé pour __toutes__ les **arrivées** du serveur\n Executeur : <@${message.author.id}>`)
                        .setTimestamp()
                        .setFooter({ text: `${footer}` })
                    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(() => false)
                }
            }
        }
    }
}