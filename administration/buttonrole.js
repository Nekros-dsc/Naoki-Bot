const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../config.js")

module.exports = {
    name: 'buttonrole',
    usage: 'buttonrole',
    description: `Permet de faire un buttonrole.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            const msg = args.slice(1).join(" ")

         
            const embed = new Discord.MessageEmbed()
                .setTitle(`Prends ton role`)
                .setDescription(`${msg}\n__Role :__ ${role}`)
                .setColor(color)


            const rolemenu = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('roles')
                        .setLabel(role.name)
                        .setStyle('SUCCESS')
                )

            const msgg = await message.channel.send({ embeds: [embed], components: [rolemenu] })

            await db.set(`buttonrole_${msgg.id}`, role.id)

        }
    }
}