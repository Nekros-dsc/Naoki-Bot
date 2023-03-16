const Discord = require("discord.js")
const config = require("../config")


module.exports = {
    name: 'setavatar',
    usage: 'setavatar <image>',
    description: `Permet de changer l'avatar du bot.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (message.attachments.size > 0) {
                message.attachments.forEach(attachment => {
                    client.user.setAvatar(attachment.url)
                        .then(u => message.channel.send(`${message.author}, Vous avez changé la **photo de profil** de votre bot.`))
                        .catch(() => message.reply("Veuillez patienter avant de rechanger mon avatar"))
                });
            } else if (args.length) {
                let str_content = args.join(" ")
                client.user.setAvatar(str_content)
                    .then(u => message.reply(`Vous avez changé la **photo de profil** de votre bot.`))
                    .catch(() => message.reply("Veuillez patienter avant de rechanger mon avatar"))
            } else {
                message.channel.send(`Format accépté : Image **&** Lien`);
            }

        }
    }
}