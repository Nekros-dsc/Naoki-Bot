const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const config = require('../config')
const db = require('quick.db')
const moment = require('moment')
const fs = require('fs')
const owner = new db.table("Owner")
const emote = require('../emotes.json')

module.exports = {
    name: 'transcript',
    usage: 'transcript',
    category: "owner",
    description: `Commande transcript.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const msgd = await message.channel.send({
                content: `${emote.owner.warn} Récupération des messages, cela peut prendre un certain temps...`,
            })

            const fetchAll = require('discord-fetch-all');

            const allMessages = await fetchAll.messages(message.channel, {
                reverseArray: true,
                userOnly: true,
                botOnly: false,
                pinnedOnly: false,
            });

            var results = allMessages.map(msg => `${moment(msg.createdTimestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM")}] - ${msg.author.username} - (${msg.author.id}) : ${msg.content}`).join('\n')

            const hastebin = require("hastebin-gen");

            hastebin(`Voici les logs du salon ${message.channel.name} - ${message.channel.id} sur le serveur ${message.guild.name}\nCes logs ont été demandés par ${message.author.username}\n\u200b\n` + results, {
                extension: "diff",
                url: 'https://haste.chaun14.fr/'
            }).then(haste => {
                fs.writeFile(`./${message.channel.id}_${message.author.id}`, results, () =>
                    setTimeout(function () {
                        fs.unlink(`./${message.channel.id}_${message.author.id}`, (err) => {
                            if (err) throw err;
                        });
                    }, 1000))
                msgd.edit({ content: `Je vous ai envoyé le **transcript** du salon en message privé` })

                message.member.send({
                    content: `Voici le **transcript** du salon que vous avez demandé, vous pouvez le télécharger ou aller sur le **hastebin** : ${haste} `,
                    files: [{
                        attachment: `./${message.channel.id}_${message.author.id}`,
                        name: `log${message.channel.id}.txt`
                    }],

                })
                // 1000ms = 1sec

            })
        }
    }
}