const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
 const config = require("../config.js")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'clear',
    usage: 'clear',
    description: `Permet de supprimer des messages`,
    async execute(client, message, args) {
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (message.mentions.members.first()) {


            if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true)

                message.delete()
            message.channel.messages.fetch({ limit: 100 })
                .then((messages) => {
                    var filterUser = message.mentions.members.first().id;
                    var filtered = messages.filter(m => m.author.id === filterUser).array().slice(0, 100);
                    message.channel.bulkDelete(filtered, true)

                }).catch(() => false);

        } else
            if (!isNaN(message.content.split(' ')[1])) {
                if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

                    let amount = 0;
                    if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
                        amount = 1;
                    } else {
                        message.delete()
                        amount = message.content.split(' ')[1];
                        if (amount > 100) {
                            amount = 100;
                        }
                    }
                    await message.channel.bulkDelete(amount, true).then((_message) => {
                    });
                }

                let color = cl.fetch(`color_${message.guild.id}`)
                if (color == null) color = config.app.color

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`<@${message.author.id}> a \`clear\` ${args[0]} message dans <#${message.channel.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            } else {

                if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {


                    await message.channel.bulkDelete(100, true).then((_message) => {
                    })
                }
            }
    }
}