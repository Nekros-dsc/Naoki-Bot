const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const config = require("../config")
const footer = config.app.footer
const { ChaosWords } = require("weky");

module.exports = {
    name: 'mot',
    usage: 'mot',
    description: `jeux`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color


        await ChaosWords({
            message: message,
            embed: {
                title: 'Trouve les mots',
                description: 'Tu as **{{time}}** pour trouver les mots cachés dans la phrase ci-dessous.',
                color: `${color}`,
                field1: 'Phrase:',
                field2: 'Mots trouvés/restants:',
                field3: 'Mots trouvés:',
                field4: 'Mots:',
                footer: `${footer}`,
                timestamp: false
            },
            winMessage: 'GG, Tu as gagné! Tu l\'as fait en **{{time}}**.',
            loseMessage: 'Plus de chance la prochaine fois!',
            wrongWordMessage: 'Mauvais mot ! Tu as **{{remaining_tries}}** essais restants.',
            correctWordMessage: 'GG, **{{word}}** est correcte ! Vous devez trouver **{{remaining}}** mot(s).',
            time: 60000,
            words: ['salut', 'temps', 'bravo'],
            charGenerated: 15,
            maxTries: 10,
            buttonText: 'Abandonné',
            othersMessage: 'Seulement <@{{author}}> peut utiliser le bouton'
        });
    }
}