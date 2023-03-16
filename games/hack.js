const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const config = require("../config")
const footer = config.app.footer
const emote = require('../emotes.json')

module.exports = {
    name: 'hack',
    usage: 'hack',
    description: `jeux`,
    async execute(client, message, args) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px


        if (!args[0]) {
            return message.channel.send(
                `Mentionne le membre à Pirater ${emote.games.hack}`
            );
        }
        const tohack = message.mentions.members.first();
        let msg = await message.channel.send(`Piratage de ${tohack.displayName}....`);

        let time = "1s";
        setTimeout(function () {
            msg.edit(`Recherche de l'Email et Mot de Passe de ${tohack.displayName} .....`);
        }, ms(time));

        let time1 = "6s";
        setTimeout(function () {
            msg.edit(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: \`********\``);
        }, ms(time1));

        let time2 = "9s";
        setTimeout(function () {
            msg.edit("Recherche d'autres comptes.....");
        }, ms(time2));

        let time3 = "15s";
        setTimeout(function () {
            msg.edit("Compte Epic Games trouvé.....");
        }, ms(time3));

        let time4 = "21s";
        setTimeout(function () {
            msg.edit("Piratage du compte Epic Games......");
        }, ms(time4));

        let time5 = "28s";
        setTimeout(function () {
            msg.edit("Compte Epic Games piraté !");
        }, ms(time5));

        let time6 = "31s";
        setTimeout(function () {
            msg.edit("Récupération des Informations.....");
        }, ms(time6));

        let time7 = "38s";
        setTimeout(function () {
            msg.edit("Vente de données aux FBI....");
        }, ms(time7));

        let time8 = "41s";
        setTimeout(function () {
            msg.edit(`Piratage de ${tohack.displayName} terminé avec succès`);
        }, ms(time8));
    },
};