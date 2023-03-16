const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const punish = new db.table("Punition")
const p = new db.table("Prefix")
const cl = new db.table("Color")

module.exports = {
    name: 'punition',
    usage: 'punition',
    description: `Permet de configuré la punition de l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let fufu = punish.get(`sanction_${message.guild.id}`)
            if (fufu == null) fufu = "derank"

            const embed = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Punition actuelle : \`${fufu}\``)
                .setColor(color)

            const derank = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`derank\``)
                .setColor(color)

            const kick = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`kick\``)
                .setColor(color)

            const ban = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`ban\``)
                .setColor(color)


            const punition = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('derank')
                        .setLabel('Derank')
                        .setStyle('PRIMARY')
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('kick')
                        .setLabel('Kick')
                        .setStyle('DANGER')
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('ban')
                        .setLabel('Ban')
                        .setStyle('DANGER')
                )

            message.channel.send({ embeds: [embed], components: [punition] }).then(async msg => {

                const collector = message.channel.createMessageComponentCollector({
                    componentType: "BUTTON",
                    filter: (i => i.user.id === message.author.id)
                })
                collector.on("collect", async (c) => {
                    const value = c.customId

                    if (value === "derank") {
                        punish.set(`sanction_${message.guild.id}`, "derank")
                        c.reply({ content: `La punition en cas de __raid__ sera désormais un **derank**`, ephemeral: true })
                        msg.edit({ embeds: [derank] })
                    }

                    else if (value === "kick") {
                        punish.set(`sanction_${message.guild.id}`, "kick")
                        c.reply({ content: `La punition en cas de __raid__ sera désormais un **kick**`, ephemeral: true })
                        msg.edit({ embeds: [kick] })
                    }

                    if (value === "ban") {
                        punish.set(`sanction_${message.guild.id}`, "ban")
                        c.reply({ content: `La punition en cas de __raid__ sera désormais un **ban**`, ephemeral: true })
                        msg.edit({ embeds: [ban] })
                    }

                })
            })
        }
    }
}