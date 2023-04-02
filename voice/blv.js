const Discord = require("discord.js")
const db = require('quick.db')
 const config = require("../config.js")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const blv = new db.table("blvoc")
const footer = config.app.footer


module.exports = {
    name: 'blv',
    usage: 'antivoc',
    description: `Permet de choisir l'image affiché sur l'accueil du help.`,
    async execute(client, message, args) {


        if (owner.get(`owners.${message.author.id}`) || (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id)) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }

                     if (owner.get(`owners.${member.id}`) || config.app.owners.includes(member.id) || config.app.funny.includes(member.id) === true)
                return;
                
                
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (blv.get(`${message.guild.id}.${member.id}.blv`) === true) { return message.channel.send(`${member.username} est déjà Blacklist vocal`) }
                blv.add(`${message.guild.id}.blvcount`, 1)
                blv.push(`${message.guild.id}.blv`, member.id)
                blv.set(`${message.guild.id}.${member.id}.blv`, member.id)

                message.channel.send(`${member.username} est maintenant dans la Blacklist vocal`)

            } else if (!args[0]) {


                let own = blv.get(`${message.guild.id}.blv`)
                let ownc = blv.get(`${message.guild.id}.blvcount`)
                if (ownc === null || "Nan") ownc = 1
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                embed.setTitle("Blacklist Vocal")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n")
                    )
                    .setFooter({ text: `${footer}` })
                message.channel.send({ embeds: [embed] })


            }
        }
    }
}
