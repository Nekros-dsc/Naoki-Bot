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

module.exports = {
    name: 'tempvoc',
    usage: 'tempvoc',
    description: `Permet de configurer les tempvoc.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

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
                                label: "Catégorie Tempvoc",
                                value: `categorietempvoc`,
                                emoji: "998562005155860510",
                            },
                            {
                                label: 'Salon Tempvoc',
                                value: `salontempvoc`,
                                emoji: "💬",
                            },
                            {
                                label: "Activé les vocaux temporaires",
                                value: "activemodule",
                                emoji: "972648521255768095",
                            },
                            {
                                label: "Désactivé les vocaux temporaires",
                                value: "desactivemodule",
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

                    let tempvocsettings = db.get(`tempvocsettings_${message.guild.id}`)
                    if (tempvocsettings == null) tempvocsettings = "Non Configuré"
                    if (tempvocsettings == true) tempvocsettings = "Activé"
                    if (tempvocsettings == false) tempvocsettings = "Desactivé"

                    let categorytemp = `<#${db.get(`categorytempvoc_${message.guild.id}`)}>`
                    if (categorytemp == "<#null>") categorytemp = "Non Configuré"

                    let salontemp = `<#${db.get(`salontempvoc_${message.guild.id}`)}>`
                    if (salontemp == "<#null>") salontemp = "Non configuré"


                    const MenuEmbed = new Discord.MessageEmbed()
                        .setTitle('Vocaux Temporaires')
                        .setDescription(`__**Choisissez les options pour configuré les vocaux temporaires**__`)
                        .addFields(
                            { name: 'Activé/Désactivé', value: `Tempvoc: __**${tempvocsettings}**__`, inline: true },
                            { name: 'Catégorie tempvoc', value: `Catégorie: __**${categorytemp}**__`, inline: true },
                            { name: 'Salon tempvoc', value: `Salon: __**${salontemp}**__`, inline: true },
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
                        .setTitle(`Configuré les salons temporaires`)
                        .setDescription("**Séléctionner l'option qui vous correspond**")
                        .setColor(color)
                        .setImage('https://cdn.discordapp.com/attachments/904084986536276059/1003966590867472525/2022-08-02_11-59-40.gif')

                    const antichanneldelete = new MessageEmbed()
                        .setTitle(`Configuré le MP de bienvenue`)
                        .setDescription("**Indiquer quel message sera envoyé aux nouveau membres qui rejoindront le serveur**")
                        .setColor(color)
                        .setImage('https://cdn.discordapp.com/attachments/904084986536276059/1003966590867472525/2022-08-02_11-59-40.gif')

                    let options = new MessageSelectMenu()
                        .setCustomId('MenuOn')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis une option")
                        .addOptions([
                            {
                                label: "Définir une Catégorie",
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
                                label: "Définir un Salon",
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
                        else if (i.values[0] === "categorietempvoc") {
                            menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })
                            await i.deferUpdate().catch(() => false)
                        }
                        if (i.values[0] == "active") {
                            let link = db.fetch(`categorytempvoc_${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ |\`Une catégorie \` est déjà setup`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }
                            else {
                                await i.deferUpdate().catch(() => false)
                                const oui = await message.channel.send(`Quelle est la catégorie ou seront créer les vocaux temporaires`)
                                let collected = message.channel.awaitMessages({
                                    filter: m => m.author.id === message.author.id,
                                    max: 1,
                                    time: 100000,
                                    errors: ["time"]
                                })
                                    .then(collected => {
                                        oui.delete()

                                        const status = collected.first().content
                                        db.set(`categorytempvoc_${message.guild.id}`, status)
                                        collected.first().delete().catch(() => false)

                                        message.channel.send(`✅ |\`La catégorie \` a bien été enregistrée`).then(msg => {
                                            setTimeout(() => msg.delete(), 5000)
                                        }).catch(() => false);
                                    })
                            }

                        } else if (i.values[0] == "Retour") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                            await i.deferUpdate().catch(() => false)

                        } else if (i.values[0] == 'desactive') {
                            let link = db.fetch("messagebvn_" + message.guild.id)
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
                        else if (i.values[0] === "salontempvoc") {
                            menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })
                            await i.deferUpdate().catch(() => false)
                        } if (i.values[0] == "activedel") {
                            await i.deferUpdate().catch(() => false)
                            let link = db.fetch(`salontempvoc_${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ |\`Le salon tempvoc \` est déjà configuré`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                            } else {

                                const ez = await message.channel.send(`Quel salon sera utilisé pour les vocaux temporaires`)
                                let collected = await message.channel.awaitMessages({
                                    filter: filter2,
                                    max: 1,
                                    time: 5000,
                                    errors: ["time"]
                                }).then(collected => {
                                    ez.delete()

                                    const status = collected.first().content
                                    db.set(`salontempvoc_${message.guild.id}`, status)
                                    //  db.set("support"+ message.guild.id , true)
                                    message.channel.send(`✅ |\`Le salon des vocaux temporaires a été enregistrée \`Salon: <#${status}>`).then(msg => {
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
                                message.channel.send(`❌ |\`Les vocaux temporaires \` vien d'être reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)


                            } else {
                                message.channel.send(`❌ |\`Les vocaux temporaires \` sont déjà reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }
                        }


                        //activé MSG
                        if (i.values[0] === "activemodule") {
                            await i.deferUpdate().catch(() => false)
                            let soutien = db.fetch("tempvocsettings_" + message.guild.id)
                            if (soutien === true) {
                                return message.channel.send("Les vocaux temporaires sont déjà activés").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            } else {
                                db.set("tempvocsettings_" + message.guild.id, true)
                                return message.channel.send("✅ |Les vocaux temporaires viennent d'être activés.").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }
                        } else if (i.values[0] === "desactivemodule") {
                            await i.deferUpdate().catch(() => false)
                            let soutien = db.fetch("tempvocsettings_" + message.guild.id)
                            if (soutien == true) {
                                db.set("tempvocsettings_" + message.guild.id, null)
                                return message.channel.send("❌ | Les vocaux temporaires viennent d'être désactivés.").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            } else return message.channel.send('✅ | Les vocaux temporaires sont déjà désactivés.').then(msg => {
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
    }
}