const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")
const config = require("../config")
const footer = config.app.footer
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");

module.exports = {
    name: 'gif',
    usage: 'gif',
    description: `jeux`,
    async execute(client, message, args) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (args.length === 0) {
            message.channel.send("Indiquez une recherche");
            return;
          }
          if (args.length === 1) {
            term = args.toString();
          } else {
            term = args.join(" ");
          }
          giphy.search(term).then(function (res) {

            let id = res.data[0].id;
            let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
      
            const embed = new Discord.MessageEmbed()
              .setTitle(`Résultat pour \`${term}\``)
              .setImage(msgurl)
              .setFooter({text: `${footer}`})
              .setColor(color);
            message.channel.send({ embeds: [embed] });
          });
      
          message.delete();
        },
      };