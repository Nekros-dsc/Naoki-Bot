const Discord = require('discord.js');
let started_time_duration = ""
let time_duration = ""
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const pga = new db.table("PermGa")

module.exports = {
    name: 'reroll',
    usage: 'reroll',
    description: `Permet de reroll un Giveaway sur le serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(pga.fetch(`permga_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let pf = p.fetch(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.app.px

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (!args[0])
            return message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``)
        
            await client.giveawaysManager.reroll(args[0], {
                messages: {
                    congrat: ':tada: Nouveau gagnant(s): {winners}! Félicitation, tu as gagné **{this.prize}**!',
                    error: 'Aucun membre de participe à ce giveaway, le(s) gagnant(s) ne peuvent pas être choisi!'
                }
            })
            .catch(() => message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``))
        }
    }
}