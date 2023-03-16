const Discord = require("discord.js")
const config = require("../config")
const footer = config.app.footer
const db = require("quick.db")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const punish = new db.table("Punition")
const cl = new db.table("Color")
const atc = new db.table("antichannelcreate")
const atd = new db.table("antichanneldelete")
const acu = new db.table("antichannelupdate")
const al = new db.table("AntiLink")
const atr = new db.table("antirolecreate")
const ard = new db.table("antiroledelete")
const aru = new db.table("antiroleupdate")
const aw = new db.table("antiwebhook")
const agu = new db.table("Guildupdate")
const atb = new db.table("Antibot")
const aba = new db.table("Antiban")
const ae = new db.table("Antieveryone")
const ad = new db.table("Antidown")
const lock = new db.table("Serverlock")
const aa = new db.table("Antiadmin")
const emote = require('../emotes.json')

module.exports = {
    name: 'secur',
    usage: 'secur',
    description: `Permet de configuré les sécuritées sur le serveur.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const emojion = emote.antiraid.on || "✅"
            const emojioff = emote.antiraid.off || "❌"

            if (args[0] == 'on') {
                atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                agu.set(`guildupdate_${message.guild.id}`, true)
                atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                al.set(`config.${message.guild.id}.antilinkall`, true)
                atr.set(`config.${message.guild.id}.antirolecreate`, true)
                ard.set(`config.${message.guild.id}.antiroledelete`, true)
                aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                aw.set(`config.${message.guild.id}.antiwebhook`, true)
                atb.set(`config.${message.guild.id}.antibot`, true)
                aba.set(`config.${message.guild.id}.antiban`, true)
                ae.set(`config.${message.guild.id}.antieveryone`, true)
                ad.set(`config.${message.guild.id}.antidown`, true)
                aa.set(`config.${message.guild.id}.antiadmin`, true)
            }


            if (args[0] == 'off') {
                atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                agu.set(`guildupdate_${message.guild.id}`, false)
                atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                al.set(`config.${message.guild.id}.antilinkall`, false)
                atr.set(`config.${message.guild.id}.antirolecreate`, false)
                ard.set(`config.${message.guild.id}.antiroledelete`, false)
                aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                aw.set(`config.${message.guild.id}.antiwebhook`, false)
                atb.set(`config.${message.guild.id}.antibot`, false)
                aba.set(`config.${message.guild.id}.antiban`, false)
                ae.set(`config.${message.guild.id}.antieveryone`, false)
                ad.set(`config.${message.guild.id}.antidown`, false)
                aa.set(`config.${message.guild.id}.antiadmin`, false)
            }


            //////////////                    antilink                    ///////////////////////////
            let antilink = await al.get(`config.${message.guild.id}.antilinkinvite`) || al.get(`config.${message.guild.id}.antilinkall`)
            if (antilink == true) antilink = `${emojion}`
            if (antilink == false) antilink = `${emojioff}`
            if (antilink == null) antilink = `${emojioff}`

            //////////////                    antiwebhook                    ///////////////////////////
            let antiwebhook = await aw.get(`config.${message.guild.id}.antiwebhook`)
            if (antiwebhook == true) antiwebhook = `${emojion}`
            if (antiwebhook == false) antiwebhook = `${emojioff}`
            if (antiwebhook == null) antiwebhook = `${emojioff}`

            //////////////                    antichannelcreate                    ///////////////////////////
            let antichannelcreate = await atc.get(`config.${message.guild.id}.antichannelcreate`)
            if (antichannelcreate == true) antichannelcreate = `${emojion}`
            if (antichannelcreate == false) antichannelcreate = `${emojioff}`
            if (antichannelcreate == null) antichannelcreate = `${emojioff}`


            //////////////                    antiupdate                    ///////////////////////////
            let antiupdate = await agu.get(`guildupdate_${message.guild.id}`)
            if (antiupdate == true) antiupdate = `${emojion}`
            if (antiupdate == false) antiupdate = `${emojioff}`
            if (antiupdate == null) antiupdate = `${emojioff}`


            //////////////                    antichanneldelete                    ///////////////////////////
            let antichanneldelete = await atd.get(`config.${message.guild.id}.antichanneldelete`)
            if (antichanneldelete == true) antichanneldelete = `${emojion}`
            if (antichanneldelete == false) antichanneldelete = `${emojioff}`
            if (antichanneldelete == null) antichanneldelete = `${emojioff}`


            //////////////                    antichannelupdate                    ///////////////////////////
            let antichannelupdate = await acu.get(`config.${message.guild.id}.antichannelupdate`)
            if (antichannelupdate == true) antichannelupdate = `${emojion}`
            if (antichannelupdate == false) antichannelupdate = `${emojioff}`
            if (antichannelupdate == null) antichannelupdate = `${emojioff}`

            //////////////                    antirolecreate                    ///////////////////////////
            let antirolecreate = await atr.get(`config.${message.guild.id}.antirolecreate`)
            if (antirolecreate == true) antirolecreate = `${emojion}`
            if (antirolecreate == false) antirolecreate = `${emojioff}`
            if (antirolecreate == null) antirolecreate = `${emojioff}`

            //////////////                    antiroledelete                    ///////////////////////////
            let antiroledelete = await ard.get(`config.${message.guild.id}.antiroledelete`)
            if (antiroledelete == true) antiroledelete = `${emojion}`
            if (antiroledelete == false) antiroledelete = `${emojioff}`
            if (antiroledelete == null) antiroledelete = `${emojioff}`

            //////////////                    antiroleupdate                    ///////////////////////////
            let antiroleupdate = await aru.get(`config.${message.guild.id}.antiroleupdate`)
            if (antiroleupdate == true) antiroleupdate = `${emojion}`
            if (antiroleupdate == false) antiroleupdate = `${emojioff}`
            if (antiroleupdate == null) antiroleupdate = `${emojioff}`

            //////////////                    antibot                    ///////////////////////////
            let antibot = await atb.get(`config.${message.guild.id}.antibot`)
            if (antibot == true) antibot = `${emojion}`
            if (antibot == false) antibot = `${emojioff}`
            if (antibot == null) antibot = `${emojioff}`

            //////////////                    antiban                    ///////////////////////////
            let antiban = await aba.get(`config.${message.guild.id}.antiban`)
            if (antiban == true) antiban = `${emojion}`
            if (antiban == false) antiban = `${emojioff}`
            if (antiban == null) antiban = `${emojioff}`

            //////////////                    antieveryone                    ///////////////////////////
            let antieveryone = await ae.get(`config.${message.guild.id}.antieveryone`)
            if (antieveryone == true) antieveryone = `${emojion}`
            if (antieveryone == false) antieveryone = `${emojioff}`
            if (antieveryone == null) antieveryone = `${emojioff}`

            //////////////                    antidown                    ///////////////////////////
            let antidown = await ad.get(`config.${message.guild.id}.antidown`)
            if (antidown == true) antidown = `${emojion}`
            if (antidown == false) antidown = `${emojioff}`
            if (antidown == null) antidown = `${emojioff}`

            //////////////                    antiadmin                    ///////////////////////////
            let antiadmin = await aa.get(`config.${message.guild.id}.antiadmin`)
            if (antiadmin == true) antiadmin = `${emojion}`
            if (antiadmin == false) antiadmin = `${emojioff}`
            if (antiadmin == null) antiadmin = `${emojioff}`



            const secu = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('active')
                        .setLabel('Activé')
                        .setStyle('SUCCESS')
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('desactive')
                        .setLabel('Désactivé')
                        .setStyle('DANGER')
                )

            const panel = new Discord.MessageEmbed()
                .setAuthor({ name: `🛡️ • Panel des Sécurités` })
                .setDescription(`

             Antibot : ${antibot}

             Antiadmin : ${antiadmin}

             Antiban : ${antiban}

             Antichannel create : ${antichannelcreate}

             Antichannel delete : ${antichanneldelete}

             Antichannel update : ${antichannelupdate}

             Antirole create : ${antirolecreate}

             Antirole delete : ${antiroledelete}

             Antirole update : ${antiroleupdate}

             Anti Update : ${antiupdate}

             Anti Down : ${antidown}

             Anti Everyone : ${antieveryone}

             Antilink : ${antilink} 
            *(Ignoré par la whitelist)*

             Anti webhook : ${antiwebhook}
               
               `)

                .setFooter({ text: `Faites la commande ${pf}bypass pour obtenir des informations supplémentaires` })
                .setColor(color)

            const panelactive = new Discord.MessageEmbed()
                .setAuthor({ name: `🛡️ • Panel des Sécurités` })
                .setDescription(`

                Antibot : ${emojion}

                Antiban : ${emojion}
   
                Antichannel create : ${emojion}
   
                Antichannel delete : ${emojion}
   
                Antichannel update : ${emojion}
   
                Antirole create : ${emojion}
   
                Antirole delete : ${emojion}
   
                Antirole update : ${emojion}
   
                Anti Update : ${emojion}

                Anti Down : ${emojion}
   
                Anti Everyone : ${emojion}
   
                Antilink : ${emojion} 
               *(Ignoré par la whitelist)*
   
                Anti webhook : ${emojion}
                  
                  `)


                .setFooter({ text: `Faites la commande ${pf}bypass pour obtenir des informations supplémentaires` })
                .setColor(color)

            const paneldesactive = new Discord.MessageEmbed()
                .setAuthor({ name: `🛡️ • Panel des Sécurités` })
                .setDescription(`

             Antibot : ${emojioff}

             Antiadmin : ${antiadmin}

             Antiban : ${emojioff}

             Antichannel create : ${emojioff}

             Antichannel delete : ${emojioff}

             Antichannel update : ${emojioff}

             Antirole create : ${emojioff}

             Antirole delete : ${emojioff}

             Antirole update : ${emojioff}

             Anti Update : ${emojioff}

             Anti Down : ${emojioff}

             Anti Everyone : ${emojioff}

             Antilink : ${emojioff} 
            *(Ignoré par la whitelist)*

             Anti webhook : ${emojioff}
               
               `)

                .setFooter({ text: `Faites la commande ${pf}bypass pour obtenir des informations supplémentaires` })
                .setColor(color)

            const panelselect = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('Funny')
                    .setPlaceholder(`Protections`)
                    .addOptions([
                        {
                            label: 'Punition',
                            value: 'punish',
                            emoji: '',
                        },
                        {
                            label: 'Accès au serveur',
                            value: 'ass',
                            emoji: '',
                        },
                        {
                            label: 'AntiBan',
                            value: 'aba',
                            emoji: '',
                        },
                        {
                            label: 'Anti Channel Create',
                            value: 'acc',
                            emoji: '',
                        },
                        {
                            label: 'Anti Channel Delete',
                            value: 'acd',
                            emoji: '',
                        },
                        {
                            label: 'Anti Channel Update',
                            value: 'acu',
                            emoji: '',
                        },
                        {
                            label: 'Anti Role create',
                            value: 'arc',
                            emoji: '',
                        },
                        {
                            label: 'Anti Role delete',
                            value: 'ard',
                            emoji: '',
                        },
                        {
                            label: 'Anti Role update',
                            value: 'aru',
                            emoji: '',
                        },
                        {
                            label: 'AntiLink',
                            value: 'al',
                            emoji: '',
                        },
                        {
                            label: 'Anti WebHooks',
                            value: 'aw',
                            emoji: '',
                        },
                        {
                            label: 'Anti Update',
                            value: 'au',
                            emoji: '',
                        },
                        {
                            label: 'Anti Bot',
                            value: 'ab',
                            emoji: '',
                        }

                    ])
            )


            message.channel.send({ embeds: [panel], components: [secu, panelselect] }).then(async msg => {

                //anti channel create
                const antichannelembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti channel create__**`)
                    .setColor(color)

                const antichannelrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'accon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'accoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti channel delete
                const antichanneldembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti channel delete__**`)
                    .setColor(color)

                const antichannedlrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'acdon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'acdoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti channel update
                const antichanneupdembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti channel update__**`)
                    .setColor(color)

                const antichanneduprow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'acuon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'acuoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti Role create
                const antirolecreateembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti role create__**`)
                    .setColor(color)

                const antirolecreaterow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'arcon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'arcoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti role delete
                const antiroledeleteembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti role delete__**`)
                    .setColor(color)

                const antiroledeleterow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'ardon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'ardoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti role update
                const antiroleupembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti role update__**`)
                    .setColor(color)

                const antiroleuprow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'aruon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'aruoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti Link
                const antilinkembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'antilink__**`)
                    .setColor(color)

                const antilinkrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'alon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'aloff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //anti wb
                const antiwbembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer __l'anti WebHook__**`)
                    .setColor(color)

                const antiwbrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'awon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'awoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //Punition
                const punishembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer la __Punition__**`)
                    .setColor(color)

                const punishrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer la Punition`)
                        .addOptions([
                            {
                                label: 'Derank',
                                value: 'derank',
                                emoji: '',
                            },
                            {
                                label: 'Kick',
                                value: 'kick',
                                emoji: '',
                            },
                            {
                                label: 'Ban',
                                value: 'ban',
                                emoji: '',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Anti update
                const antiupdateembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer l' __anti update__**`)
                    .setColor(color)

                const antiupdaterow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer l'anti update`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'auon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'auoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Anti Bot
                const antibotembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer l'__anti bot__**`)
                    .setColor(color)

                const antibotrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer l'anti bot`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'atbon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'atboff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Server lock/unlock
                const lockembed = new Discord.MessageEmbed()
                    .setDescription(`**Autoriser ou refuser __l'accès au serveur__**`)
                    .setColor(color)

                const lockrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Accès au serveur`)
                        .addOptions([
                            {
                                label: 'Vérouiller le serveur',
                                value: 'asson',
                                emoji: '🔒',
                                description: 'Attention plus personne ne pourra rejoindre le serveur',
                            },
                            {
                                label: 'Dévérouiller le serveur',
                                value: 'assoff',
                                emoji: '🔓',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Anti Ban
                const antibanembed = new Discord.MessageEmbed()
                    .setDescription(`**Comment voulez vous configurer l'__antiban__**`)
                    .setColor(color)

                const antibanrow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer l'anti bot`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'abaon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactiver',
                                value: 'abaoff',
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
                    //retour
                    if (value === "retour") {

                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "acc") {

                        msg.edit({ embeds: [antichannelembed], components: [antichannelrow] })
                    }

                    if (value === "accon") {

                        atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                        msg.edit({ embeds: [panel], components: [panelselect, secu] })
                    }

                    if (value === "accoff") {

                        atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                        msg.edit({ embeds: [panel], components: [panelselect, secu] })
                    }

                    if (value === "acd") {

                        msg.edit({ embeds: [antichanneldembed], components: [antichannedlrow] })
                    }

                    if (value === "acdon") {

                        atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "acdoff") {

                        atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "acu") {

                        msg.edit({ embeds: [antichanneupdembed], components: [antichanneduprow] })
                    }

                    if (value === "acuon") {

                        acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "acuoff") {

                        acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "arc") {

                        msg.edit({ embeds: [antirolecreateembed], components: [antirolecreaterow] })
                    }

                    if (value === "arcon") {

                        atr.set(`config.${message.guild.id}.antirolecreate`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "arcoff") {

                        atr.set(`config.${message.guild.id}.antirolecreate`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "ard") {

                        msg.edit({ embeds: [antiroledeleteembed], components: [antiroledeleterow] })
                    }

                    if (value === "ardon") {

                        ard.set(`config.${message.guild.id}.antiroledelete`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "ardoff") {

                        ard.set(`config.${message.guild.id}.antiroledelete`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "aru") {

                        msg.edit({ embeds: [antiroledeleteembed], components: [antiroledeleterow] })
                    }

                    if (value === "aruon") {

                        aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "aruoff") {

                        aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "al") {

                        msg.edit({ embeds: [antilinkembed], components: [antilinkrow] })
                    }

                    if (value === "alon") {

                        al.set(`config.${message.guild.id}.antilink`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "aloff") {

                        al.set(`config.${message.guild.id}.antilink`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "aw") {

                        msg.edit({ embeds: [antiwbembed], components: [antiwbrow] })
                    }

                    if (value === "awon") {

                        aw.set(`config.${message.guild.id}.antiwebhook`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "awoff") {

                        aw.set(`config.${message.guild.id}.antiwebhook`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "punish") {

                        msg.edit({ embeds: [punishembed], components: [punishrow] })
                    }

                    if (value === "derank") {

                        punish.set(`sanction_${message.guild.id}`, "derank")
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "kick") {

                        punish.set(`sanction_${message.guild.id}`, "kick")
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "ban") {

                        punish.set(`sanction_${message.guild.id}`, "ban")
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "au") {

                        msg.edit({ embeds: [antiupdateembed], components: [antiupdaterow] })
                    }

                    if (value === "auon") {

                        agu.set(`guildupdate_${message.guild.id}`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "auoff") {

                        agu.set(`guildupdate_${message.guild.id}`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "ab") {

                        msg.edit({ embeds: [antibotembed], components: [antibotrow] })
                    }

                    if (value === "atbon") {

                        atb.set(`config.${message.guild.id}.antibot`, true)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "atboff") {

                        atb.set(`config.${message.guild.id}.antibot`, false)
                        msg.edit({ embeds: [panel], components: [panelselect] })
                    }

                    if (value === "ass") {

                        msg.edit({ embeds: [lockembed], components: [lockrow] })
                    }

                    if (value === "asson") {

                        lock.set(`serverlock_${message.guild.id}`, "lock")
                        await msg.edit({ embeds: [panel], components: [panelselect, secu] })
                    }

                    if (value === "assoff") {

                        lock.set(`serverlock_${message.guild.id}`, "unlock")
                        await msg.edit({ embeds: [panel], components: [panelselect, secu] })
                    }

                    if (value === "aba") {

                        msg.edit({ embeds: [antibanembed], components: [antibanrow] })
                    }

                    if (value === "abaon") {

                        aba.set(`config.${message.guild.id}.antiban`, true)
                        msg.edit({ embeds: [panel], components: [panelselect, secu] })
                    }

                    if (value === "abaoff") {

                        aba.set(`config.${message.guild.id}.antiban`, false)
                        msg.edit({ embeds: [panel], components: [panelselect, secu] })
                    }
                })

                const collector = message.channel.createMessageComponentCollector({
                    componentType: "BUTTON",
                    filter: (i => i.user.id === message.author.id)
                })


                collector.on("collect", async (c) => {
                    const value = c.customId

                    if (value === "active") {

                        c.reply({ content: `**Toutes les securitées ont étaient activées avec succés**`, ephemeral: true })

                        atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                        agu.set(`guildupdate_${message.guild.id}`, true)
                        atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                        acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                        al.set(`config.${message.guild.id}.antilinkall`, true)
                        atr.set(`config.${message.guild.id}.antirolecreate`, true)
                        ard.set(`config.${message.guild.id}.antiroledelete`, true)
                        aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                        aw.set(`config.${message.guild.id}.antiwebhook`, true)
                        atb.set(`config.${message.guild.id}.antibot`, true)
                        aba.set(`config.${message.guild.id}.antiban`, true)
                        ae.set(`config.${message.guild.id}.antieveryone`, true)
                        ad.set(`config.${message.guild.id}.antidown`, true)
                        aa.set(`config.${message.guild.id}.antiadmin`, true)

                        msg.edit({ embeds: [panelactive] })
                    }

                    else if (value === "desactive") {

                        c.reply({ content: `**Toutes les securitées ont étaient désactivées avec succés**`, ephemeral: true })

                        atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                        agu.set(`guildupdate_${message.guild.id}`, false)
                        atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                        acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                        al.set(`config.${message.guild.id}.antilinkall`, false)
                        al.set(`config.${message.guild.id}.antilinkinvite`, false)
                        atr.set(`config.${message.guild.id}.antirolecreate`, false)
                        ard.set(`config.${message.guild.id}.antiroledelete`, false)
                        aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                        aw.set(`config.${message.guild.id}.antiwebhook`, false)
                        atb.set(`config.${message.guild.id}.antibot`, false)
                        aba.set(`config.${message.guild.id}.antiban`, false)
                        ae.set(`config.${message.guild.id}.antieveryone`, false)
                        ad.set(`config.${message.guild.id}.antidown`, false)
                        aa.set(`config.${message.guild.id}.antiadmin`, false)

                        msg.edit({ embeds: [paneldesactive] })
                    }
                })
            })
            .catch(() => false)
        }
    }
}
