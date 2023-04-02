const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const wl = new db.table("Whitelist")
const wlcount = new db.table("Wlcount")
const cl = new db.table("Color")
 const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'vl',
    usage: 'vl',
    category: "owner",
    description: `Permet de gérer la vl du bot.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

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
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (wl.get(`${message.guild.id}.${member.id}.vl`) === true) { return message.channel.send(`${member.username} est déjà whitelist vocal`) }
                wl.add(`${message.guild.id}.vlcount`, 1)
                wl.push(`${message.guild.id}.vl`, member.id)
                wl.set(`${message.guild.id}.${member.id}.vl`, member.id)

                message.channel.send(`${member.username} est maintenant dans la whitelist vocal`)

            } else if (!args[0]) {


                let own = wl.get(`${message.guild.id}.vl`)
                let ownc = wl.get(`${message.guild.id}.vlcount`)
                if (ownc === null || "Nan") ownc = 1
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                embed.setTitle("Whitelist Vocal")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n")
                    )
                    .setFooter({ text: `${footer}` })
                message.channel.send({ embeds: [embed] })


            }
        }
    }

}
