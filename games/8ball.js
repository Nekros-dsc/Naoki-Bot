const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const config = require("../config")
const footer = config.app.footer

module.exports = {
    name: '8ball',
    usage: '8ball',
    description: `jeux`,
    async execute(client, message, args) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px


        if (args.length == 0)
            return message.channel
                .send(`\`Exemple: ${pf}8ball <msg>\``)
                .then((msg) => setTimeout(() => msg.delete(), 3000));

        var funny = [
            "Oui.",
            "C'est certain.",
            "C'est décidément ainsi.",
            "Sans aucun doute.",
            "Oui définitivement.",
            "Vous pouvez vous y fier.",
            "Comme je le vois oui.",
            "Le plus probable.",
            "Bonnes perspectives.",
            "Les signes pointent vers Oui.",
            "Répondre brumeux, réessayer.",
            "Demander à nouveau plus tard j'ai la flemme là.",
            "Mieux vaut ne pas te le dire maintenant...",
            "Impossible de prédire maintenant.",
            "Concentrez-vous et demandez à nouveau vous etes bourré ?",
            "Ne comptez pas dessus.",
            "Ma réponse est non !",
            "Mes sources disent non !",
            "Perspectives pas si bonnes...",
            "Très douteux.",
        ];
        message.reply(
            funny[Math.floor(Math.random() * funny.length)]
        );
    },
};