const Discord = require("discord.js")
 const config = require("../config.js")
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = {
  name: 'listen',
  usage: 'listen <statut>',
  description: `Permet de changer l'avatar du bot.`,
  async execute(client, message, args) {

    if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

      let status = args.join(" ")
      if (args.join(" ").length > 20) return message.reply("le status ne peux pas faire plus de 20 caracteres")

       client.user.setActivity(status, { type: "LISTENING", url:"https://twitch.tv/karma"})
       db.set('stream', status)
       db.set('type', "LISTENING")
       message.reply(`Le bot écoute dès à présent : **${status}**`)

    }
  }
}