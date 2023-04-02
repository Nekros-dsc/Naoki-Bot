const Discord = require("discord.js")
const db = require('quick.db')
 const config = require("../config.js")

module.exports = {
    name: 'reboot',
    usage: 'uc',
    description: `Permet de redémarrer le bot.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            message.channel.send(`<a:reload:1073570873375719445> Update en cours... `).then(async message => {
              await message.edit(`Update Terminé`)
              client.destroy() 
              return process.exit()
                

            })
        }
    }
}