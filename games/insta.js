const { Snake } = require("discord-gamecord")
const Discord = require("discord.js")
const config = require("../config")
const db = require('quick.db')
const footer = config.app.footer

module.exports = {
    name: 'insta',
    usage: 'insta',
    async execute(client, message, args) {

        let color = db.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const insta = args[0];
        const msg = args.join(" ");
        const link = `https://www.instagram.com/${insta}/?hl=fr`;
    
        if (!msg) {
          return message.channel.send('Veuillez indiquer un compte !');
        }
    
        const embed = new Discord.MessageEmbed()
          .setTitle("📸 〃 Instagram")
          .addField(`Nom du compte : `, msg)
          .addField(`Lien du compte ➜ `, `[${insta}](${link})`)
          .setColor('2f3136'); 
    
        message.channel.send({embeds: [embed]});
      }
    }