const Discord = require("discord.js")
const config = require("../config")


module.exports = {
    name: 'leave',
    usage: 'leave <id>',
    description: `Permet de forcer le bot à quitter un serveur.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const guildID = args[0]
            if (isNaN(guildID) || !guildID) {
                return message.channel.send(`Vous devez indiquer l'id du serveur à quitter.`)
            } else {
                const guild = client.guilds.cache.get(guildID);
                if (guild === undefined) return message.channel.send(`Votre bot n'est pas sur ce serveur.`)
                if (!guild.available) return message.channel.send('Serveur non disponible, réessayez plus tard.')

                client.guilds.cache.get(guildID).leave()
                    .then(x => {
                        message.channel.send(`J'ai bien quitté le serveur ${x.name}`).catch(() => { })
                    })
                    .catch(err => {
                        console.log(`[ERREUR] Une erreur est survenue lors du processus: \n${err}`)
                        message.channel.send(`\`\`\`js\n${err}\n\`\`\``)
                    })
            }
        }
    }
}