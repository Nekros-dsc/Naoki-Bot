const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const config = require("../config")
const ms = require('ms'),
    { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
    name: 'embed',
    usage: 'embed',
    description: `Permet de construire les embeds de votre serveur.`,

    async execute(client, message) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let selectMenuOptions = [
                {
                    label: "Modifier le Titre",
                    value: "embedtitle", emoji: "📝"
                }, {
                    label: "Modifier la Description",
                    value: "embeddescription", emoji: "💬"
                }, {
                    label: "Modifier l'Auteur",
                    value: "embedauthor", emoji: "🕵️‍♂️"
                }, {
                    label: "Modifier le Footer",
                    value: "embedfooter", emoji: "🔻"
                }, {
                    label: "Modifier le Thumbnail",
                    value: "embedthumbnail", emoji: "🔳"
                }, {
                    label: "Modifier le Timestamp",
                    value: "embedtimestamp", emoji: "🕙"
                }, {
                    label: "Modifier l'Image",
                    value: "embedimage", emoji: "🖼"
                }, {
                    label: "Modifier l'URL",
                    value: "embedurl", emoji: "🌐"
                }, {
                    label: "Modifier la Couleur",
                    value: "embedcolor", emoji: "🔴"
                }, {
                    label: "Ajouter un Field",
                    value: "embedaddfield", emoji: "⤵"
                }, {
                    label: "Supprimer un Field",
                    value: "embeddelfield", emoji: "⤴"
                }, {
                    label: "Copier un embed existant",
                    value: "embedcopyother", emoji: "📩"
                }
            ]
            var selectMenu = new MessageSelectMenu()
                .setCustomId("embedbuilder")
                .setPlaceholder("Choisissez une option")
                .addOptions([selectMenuOptions])

            var b1 = new MessageButton()
                .setCustomId("embedsend")
                .setStyle("SUCCESS")
                .setLabel("Envoyer l'embed")

            var b2 = new MessageButton()
                .setCustomId("embededit")
                .setStyle("SUCCESS")
                .setLabel("Modifier un message par l'embed")

            var embedBuilderActionRow = new MessageActionRow()
                .addComponents([selectMenu])

            var embedBuilderActionRowSendEdit = new MessageActionRow()
                .addComponents([b1, b2])

            let embed = (new MessageEmbed({ color: `${color}`, description: '\u200B' }))

            message.channel.send({ content: `**Panel de création d'embeds de ${client.user.username}.**` }).then(async d => {
                let msgembed = await d.channel.send({ embeds: [embed], components: [embedBuilderActionRow, embedBuilderActionRowSendEdit] }).catch(async err => { return; })
                const filter = m => message.author.id === m.author.id;
                const filterSelect = i => message.author.id === i.user.id;
                const collector = d.channel.createMessageComponentCollector({
                    filterSelect,
                    componentType: "SELECT_MENU",
                })
                const collectorX = d.channel.createMessageComponentCollector({
                    filterSelect,
                    componentType: "BUTTON",
                })
                collectorX.on(`collect`, async (cld) => {
                    if (cld.user.id !== message.author.id) return;
                    cld.deferUpdate().catch(() => false)
                    if (cld.customId === "embedsend") {
                        var yx = await cld.message.channel.send({ content: "Dans quel salon dois-je envoyer l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var channel = cld.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
                                if (!channel) return cld.message.channel.send({ content: "Salon introuvable." })

                                channel.send({ embeds: [embed] })
                                collected.first().delete().catch(() => false).catch(() => false)
                                yx.delete().catch(() => false).catch(() => false)
                                cld.message.channel.send({ content: "L'embed à bien été envoyé dans le salon **" + channel.name + "**." })
                                cld.message.delete().catch(() => false);
                                msgembed.delete().catch(() => false);
                                d.delete();
                            })
                    } else if (cld.customId === "embededit") {
                        var yx = await cld.message.channel.send({ content: "Dans quel salon est le message à éditer par l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var channel = cld.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
                                if (!channel) return cld.message.channel.send({ content: "Salon introuvable." })
                                var yxy = await cld.message.channel.send({ content: "Quel est l'identifiant du message à éditer par l'embed ?" })
                                message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                                    .then(async (collected2) => {
                                        var msg = await channel.messages.fetch(collected2.first().content)
                                        if (!msg) return cld.message.channel.send({ content: "Message introuvable." })

                                        msg.edit({ embeds: [embed] })
                                        collected.first().delete().catch(() => false).catch(() => false)
                                        collected.first().delete().catch(() => false).catch(() => false)
                                        yx.delete().catch(() => false).catch(() => false)
                                        yxy.delete().catch(() => false)
                                        cld.message.channel.send({ content: "Le message à été édité par l'embed dans le salon **" + channel.name + "**." })
                                        cld.message.delete().catch(() => false);
                                        msgembed.delete().catch(() => false);
                                        d.delete();
                                    })
                            })
                    }
                })
                collector.on(`collect`, async (cld) => {
                    if (cld.user.id !== message.author.id) return;
                    cld.deferUpdate().catch(() => false)
                    const value = cld.values[0]

                    if (value === "embedtitle") {
                        var yx = await cld.message.channel.send({ content: "Quel sera le **Titre** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (collected.first().content.length > 256) return cld.message.channel.send("Titre trop long (max 256 caractères).").then(async z => setTimeout(z.delete(), 2000))
                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)
                                embed.setTitle(collected.first().content)
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embeddescription") {
                        var yx = await cld.message.channel.send({ content: "Quel sera la **Description** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (collected.first().content.length > 6000) return cld.message.channel.send({ content: "Description trop longue (max 6000 caractères)." }).then(async z => setTimeout(z.delete(), 2000))
                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)
                                embed.setDescription(collected.first().content)
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedcolor") {
                        var yx = await cld.message.channel.send({ content: "Quel sera la **Couleur** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (/^#[0-9A-F]{6}$/i.test(collected.first().content) !== true) return message.channel.send({ content: "Couleur invalide." });
                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)
                                embed.setColor(collected.first().content)
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedauthor") {
                        var yx = await cld.message.channel.send({ content: "Quel sera le nom de l'**Auteur** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (collected.first().content.length > 64) return cld.message.channel.send({ content: "Nom trop long." }).then(async z => setTimeout(z.delete(), 2000))
                                var yxy = await cld.message.channel.send({ content: "Quel sera l'avatar de l'**Auteur** de l'embed ?" })
                                message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                                    .then(async (collected2) => {
                                        var yxx = await cld.message.channel.send({ content: "Quel sera l'url de l'**Auteur** de l'embed ?" })
                                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                                            .then(async (collected3) => {
                                                var a;
                                                var b;

                                                if (collected2.first().attachments.size > 0) {
                                                    collected2.first().attachments.forEach(async at => {
                                                        a = at.url
                                                    })

                                                } else if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi.test(collected2.first().content) === true) {
                                                    a = collected2.first().content
                                                } else {
                                                    a = false
                                                }

                                                if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/.test(collected3.first().content) === true) {
                                                    b = collected3.first().content
                                                } else {
                                                    b = false
                                                }
                                                collected3.first().delete();
                                                collected.first().delete().catch(() => false)
                                                collected.first().delete().catch(() => false)
                                                yx.delete().catch(() => false)
                                                yxy.delete().catch(() => false);
                                                yxx.delete();

                                                if (a === false) {
                                                    if (b === false) embed.setAuthor({ name: collected.first().content });
                                                    else embed.setAuthor({ name: collected.first().content, url: collected3.first().content });
                                                } else if (a !== false) {
                                                    if (b === false) embed.setAuthor({ name: collected.first().content, iconURL: a.toString() });
                                                    else embed.setAuthor({ name: collected.first().content, iconURL: a.toString(), url: collected3.first().content });
                                                }
                                                msgembed.edit({ embeds: [embed] })
                                            })
                                    })
                            })
                    } else if (value === "embedfooter") {
                        var yx = await cld.message.channel.send({ content: "Quel sera le texte du **Footer** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (collected.first().content.length > 64) return cld.message.channel.send({ content: "Texte trop long." }).then(async z => setTimeout(z.delete(), 2000))
                                var yxy = await cld.message.channel.send({ content: "Quel sera l'icone du **Footer** de l'embed ?" })
                                message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                                    .then(async (collected2) => {
                                        var a;

                                        if (collected2.first().attachments.size > 0) {
                                            collected2.first().attachments.forEach(async at => {
                                                a = at.url
                                            })

                                        } else if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi.test(collected2.first().content) === true) {
                                            a = collected2.first().content
                                        } else {
                                            a = false
                                        }

                                        collected.first().delete().catch(() => false)
                                        collected.first().delete().catch(() => false)
                                        yx.delete().catch(() => false)
                                        yxy.delete().catch(() => false);

                                        if (a === false) {
                                            embed.setFooter({ text: collected.first().content });
                                        } else if (a !== false) {
                                            embed.setFooter({ text: collected.first().content, iconURL: a.toString() });
                                        }
                                        msgembed.edit({ embeds: [embed] })
                                    })
                            })
                    } else if (value === "embedthumbnail") {
                        var yx = await cld.message.channel.send({ content: "Quel sera le **Thumnail** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var a;

                                if (collected.first().attachments.size > 0) {
                                    collected.first().attachments.forEach(async at => {
                                        a = at.url
                                    })

                                } else if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi.test(collected.first().content) === true) {
                                    a = collected.first().content
                                } else {
                                    a = false
                                }

                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)

                                if (a === false) {
                                    return collected.message.channel.send({ content: "L'image voulue est Invalide." })
                                } else if (a !== false) {
                                    embed.setThumbnail(a.toString());
                                }
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedimage") {
                        var yx = await cld.message.channel.send({ content: "Quelle sera l'**Image** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var a;

                                if (collected.first().attachments.size > 0) {
                                    collected.first().attachments.forEach(async at => {
                                        a = at.url
                                    })

                                } else if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi.test(collected.first().content) === true) {
                                    a = collected.first().content
                                } else {
                                    a = false
                                }

                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)

                                if (a === false) {
                                    return collected.message.channel.send({ content: "L'image voulue est Invalide." })
                                } else if (a !== false) {
                                    embed.setImage(a.toString());
                                }
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedtimestamp") {
                        var yx = await cld.message.channel.send({ content: "Quel sera le **Timestamp** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var a;
                                if (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(collected.first().content) === true) {
                                    a = collected.first().content
                                } else {
                                    a = false
                                }

                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)

                                if (a !== false) {
                                    embed.setTimestamp(new Date(a));
                                } else if (a === false) {
                                    embed.setTimestamp(new Date());
                                }
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedurl") {
                        var yx = await cld.message.channel.send({ content: "Quelle sera l'**URL** de l'embed ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var a;
                                if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/.test(collected.first().content) === true) {
                                    a = collected.first().content
                                } else {
                                    a = false
                                }

                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)

                                if (a === false) {
                                    return cld.message.channel.send({ content: "URL invalide." })
                                } else if (a !== false) {
                                    embed.setURL(a);
                                }
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedaddfield") {
                        var yx = await cld.message.channel.send({ content: "Quel sera le nom du **Field** ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (collected.first().content.length > 128) return cld.message.channel.send({ content: "Nom trop long." })
                                var yxy = await cld.message.channel.send({ content: "Quel sera la description du **Field** ?" })
                                message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                                    .then(async (collected2) => {
                                        if (embed.fields.length === 25) return cld.message.channel.send({ content: "Il y a trop de fields sur cet embed." })
                                        collected.first().delete().catch(() => false)
                                        collected.first().delete().catch(() => false)
                                        yx.delete().catch(() => false)
                                        yxy.delete().catch(() => false);

                                        embed.addField(collected.first().content, collected2.first().content);
                                        msgembed.edit({ embeds: [embed] })
                                    })
                            })
                    } else if (value === "embeddelfield") {
                        var yx = await cld.message.channel.send({ content: "Quel est le numéro du **Field** ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                if (embed.fields.length < 1) return cld.message.channel.send({ content: "Aucun field trouvé sur l'embed." })
                                if (isNaN(collected.first().content)) return cld.message.channel.send({ content: "La valeur spécifiée doit être un numéro." })
                                if (collected.first().content > embed.fields.length) return cld.message.channel.send({ content: "Le numéro est trop élevé." })
                                var indexField = Number(collected.first().content) - 1
                                embed.spliceFields(indexField, 1)
                                msgembed.edit({ embeds: [embed] })
                            })
                    } else if (value === "embedcopyother") {
                        var yx = await cld.message.channel.send({ content: "Quel est le salon de l'**Embed** ?" })
                        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var channel = cld.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
                                if (!channel) return cld.message.channel.send({ content: "Salon introuvable." })
                                var yxy = await cld.message.channel.send({ content: "Quel est le message de l'**Embed** ?" })
                                message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                                    .then(async (collected2) => {
                                        var messag = await channel.messages.fetch(collected2.first().content)
                                        if (!messag) return cld.message.channel.send({ content: "Message introuvable." })
                                        collected.first().delete().catch(() => false)
                                        collected.first().delete().catch(() => false)
                                        yx.delete().catch(() => false)
                                        yxy.delete().catch(() => false);
                                        embed = new MessageEmbed({ description: "\u200B" })
                                        if (!messag.embeds) return cld.message.channel.send({ content: "Aucun embed trouvé dans le message spécifié." });
                                        if (messag.embeds.length < 1) return cld.message.channel.send({ content: "Aucun embed trouvé dans le message spécifié." });
                                        if (messag.embeds[0].title) embed.setTitle(messag.embeds[0].title)
                                        if (messag.embeds[0].description) embed.setDescription(messag.embeds[0].description)
                                        if (messag.embeds[0].image) embed.setImage(messag.embeds[0].image.url)
                                        if (messag.embeds[0].thumbnail) embed.setThumbnail(messag.embeds[0].thumbnail.url)
                                        if (messag.embeds[0].footer) {
                                            if (messag.embeds[0].footer.iconURL) embed.setFooter({text: messag.embeds[0].footer.text, iconURL: messag.embeds[0].footer.iconURL})
                                            else embed.setFooter({text: messag.embeds[0].footer.text, iconURL: messag.embeds[0].footer.iconURL})
                                        }
                                        if (messag.embeds[0].author) {
                                            if (messag.embeds[0].author.iconURL) {
                                                if (messag.embeds[0].author.url) embed.setAuthor({ name: messag.embeds[0].author.name, iconURL: messag.embeds[0].author.iconURL, url: messag.embeds[0].author.url })
                                                embed.setAuthor({ name: messag.embeds[0].author.name, iconURL: messag.embeds[0].author.iconURL })
                                            } else {
                                                embed.setAuthor({ name: messag.embeds[0].footer.name, url: messag.embeds[0].footer.url })
                                            }
                                        }
                                        if (messag.embeds[0].url) {
                                            embed.setURL(messag.embeds[0].url)
                                        }
                                        if (messag.embeds[0].color) {
                                            embed.setColor(messag.embeds[0].color)
                                        }
                                        if (messag.embeds[0].fields) {
                                            messag.embeds[0].fields.forEach(async ee => {
                                                embed.addField(ee.name, ee.value, ee.inline)
                                            })
                                        }
                                        msgembed.edit({ embeds: [embed] })
                                    })
                            })
                    }
                })
            }).catch(e => { return; })
        }
    }
}