const Discord = require("discord.js")
const db = require('quick.db')
const p = new db.table("Prefix")
const fs = require('fs')
 const config = require("../config.js")
const { DiscordTogether } = require('discord-together');
const color = config.app.color
const footer = config.app.footer

module.exports = {
    name: 'activity',
    usage: 'activity',
    description: `Permet de faire des activités en vocal.`,
    async execute(client, message, args, color) {

        if (!message.author) return

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        client.discordTogether = new DiscordTogether(client);
        if (!message.member.voice.channel) return message.reply(`Vous n'êtes pas connecté a un salon Vocal !\n Vous ne pouvez pas jouer sans etre en vocal :(`)
        const base = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('activity')
                    .setPlaceholder(`Choisissez votre activité`)
                    .addOptions([
                        {
                            label: 'Youtube',
                            description: '',
                            value: '1',
                        },
                        {
                            label: 'Poker',
                            description: '',
                            value: '2',
                        },

                        {
                            label: 'Chess',
                            description: '',
                            value: '3',
                        },
                        {
                            label: 'Checkers in the Park',
                            description: '',
                            value: '4',
                        },
                        {
                            label: 'Betrayal',
                            description: '',
                            value: '5',
                        },
                        {
                            label: 'Fishington',
                            description: '',
                            value: '6',
                        },
                        {
                            label: 'Letter Tile',
                            description: '',
                            value: '7',
                        },
                        {
                            label: 'Words Snack',
                            description: '',
                            value: '8',
                        },
                        {
                            label: 'Doodle Crew',
                            description: '',
                            value: '9',
                        },
                        {
                            label: 'SpellCast',
                            description: '',
                            value: '10',
                        },
                        {
                            label: 'Awkword',
                            description: '',
                            value: '11',
                        },
                        {
                            label: 'Puttparty',
                            description: '',
                            value: '12',
                        },
                        {
                            label: 'Sketchheads',
                            description: '',
                            value: '13',
                        },
                        {
                            label: 'Ocho',
                            description: '',
                            value: '14',
                        },
                    ]),
            )
        const embedbase = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`
**Activity !** Veuillez choisir une option d'activié via le SelectMennu ci-dessous !
`)
            .setFooter({ text: `Prefix actuel : ${pf}` })
        message.reply({ embeds: [embedbase], components: [base] }).then(async msg => {

            const collector = msg.createMessageComponentCollector({
                componentType: "SELECT_MENU",
                filter: (i => i.user.id === message.author.id)
            })

            collector.on("collect", async (collected) => {
                collected.deferUpdate().catch(() => false)
                const value = collected.values[0];

                if (collected.customId === "activity") {
                    if (value === "1") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                            const embedYT = new Discord.MessageEmbed()
                                .setTitle('Activity Youtube Together !')
                                .setColor(color)
                                .setImage("https://i.gifer.com/74H4.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n *YoutubeTogether* ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedYT] });
                        })
                    }
                    if (value === "2") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
                            const embedPoker = new Discord.MessageEmbed()
                                .setTitle('Activity Poker !')
                                .setColor(color)
                                .setImage("https://media1.giphy.com/media/gdMvZbOabADH44Xghj/giphy.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Poker ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedPoker] });
                        })
                    }
                    if (value === "3") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
                            const embedChess = new Discord.MessageEmbed()
                                .setTitle('Activity Chess !')
                                .setColor(color)
                                .setImage("https://c.tenor.com/uImkKflPEncAAAAC/chess-anime.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Chess ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedChess] });
                        })
                    }
                    if (value === "4") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'checkers').then(async invite => {
                            const embedCheckers = new Discord.MessageEmbed()
                                .setTitle('Activity Checkers !')
                                .setColor(color)
                                .setImage("https://c.tenor.com/VR5AyND05ZwAAAAC/toy-story-woody.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Checkers ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedCheckers] });
                        })
                    }
                    if (value === "5") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'betrayal').then(async invite => {
                            const embedBetrayal = new Discord.MessageEmbed()
                                .setTitle('Activity Betrayal !')
                                .setColor(color)
                                .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0yhOfQHkgAeLgxTH7zku6nwKD3wmvxGmgWHDFeuGp3XB68JC3LXQQTMWtKk5PA7NfRDU&usqp=CAU")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Betrayal ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedBetrayal] });
                        })
                    }
                    if (value === "6") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'fishington').then(async invite => {
                            const embedFishington = new Discord.MessageEmbed()
                                .setTitle('Activity fishington !')
                                .setColor(color)
                                .setImage("https://i2.wp.com/i.giphy.com/media/uVsTi8HLm7AK6eQE1l/giphy.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Fishington ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedFishington] });
                        })
                    }
                    if (value === "7") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'lettertile').then(async invite => {
                            const embedLettertile = new Discord.MessageEmbed()
                                .setTitle('Activity Lettertile !')
                                .setColor(color)
                                .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDtTy2ZuwzX922x4TiDA0eBX4L6brn3rDPsqlBFsU3A7Mdi0x5kcv2hrDsWKhmMtN-2cw&usqp=CAU")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Lettertile ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedLettertile] });
                        })
                    }
                    if (value === "8") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {
                            const embedWordsnack = new Discord.MessageEmbed()
                                .setTitle('Activity Words Snack !')
                                .setColor(color)
                                .setImage("https://cdn.dribbble.com/users/469450/screenshots/3718372/happy_pizza.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Words Snack ! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedWordsnack] });
                        })
                    }
                    if (value === "9") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'doodlecrew').then(async invite => {
                            const embedDoodlecrew = new Discord.MessageEmbed()
                                .setTitle('Activity Doodle crew !')
                                .setColor(color)
                                .setImage("https://i.pinimg.com/originals/a9/e5/06/a9e506364ae6b6892e6a126a2f021206.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Doodle crew! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedDoodlecrew] });
                        })
                    }
                    if (value === "10") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'spellcast').then(async invite => {
                            const embedSpellcast = new Discord.MessageEmbed()
                                .setTitle('Activity Spellcast !')
                                .setColor(color)
                                .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5cy9zZT748pe42eus1FqAtp0nGfYKFZ1O94JYtXFfw9Ix7Hi8OHDNYXEkoxk_3o25C0U&usqp=CAU")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Spellcast! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedSpellcast] });
                        })
                    }
                    if (value === "11") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'awkword').then(async invite => {
                            const embedAwkword = new Discord.MessageEmbed()
                                .setTitle('Activity Awkword !')
                                .setColor(color)
                                ; setImage("https://i.gifer.com/origin/22/22b5e9b5f625950755aafc15845f0a43.gif")
                                    .setDescription(`**Voici le lien de l'activité :** \n\n Awkword! => [Clique ici](${invite.code})`)
                                    .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedAwkword] });
                        })
                    }
                    if (value === "12") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'puttparty').then(async invite => {
                            const embedPuttparty = new Discord.MessageEmbed()
                                .setTitle('Activity Puttparty !')
                                .setColor(color)
                                .setImage("https://i.pinimg.com/originals/d7/ae/01/d7ae0170d3d5ffcbaa7f02fdda387a3b.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Puttparty! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedPuttparty] });
                        })
                    }
                    if (value === "13") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'sketchheads').then(async invite => {
                            const embedSketchheads = new Discord.MessageEmbed()
                                .setTitle('Activity Sketchheads !')
                                .setColor(color)
                                .setImage("https://64.media.tumblr.com/5923c82723517f9e55187d52b949a682/d2ae8118f856b349-27/s500x750/fb7f7e597bb3611311110d1fee786757f9108fd3.gifv")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Sketchheads! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedSketchheads] });
                        })
                    }
                    if (value === "14") {
                        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'ocho').then(async invite => {
                            const embedOcho = new Discord.MessageEmbed()
                                .setTitle('Activity Ocho !')
                                .setColor(color)
                                .setImage("https://i.gifer.com/UQ5c.gif")
                                .setDescription(`**Voici le lien de l'activité :** \n\n Ocho! => [Clique ici](${invite.code})`)
                                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                            collected.message.edit({ embeds: [embedOcho] });
                        })
                    }
                }
            })
        })
    }
}