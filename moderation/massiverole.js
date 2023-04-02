const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const owner = new db.table("Owner")
 const config = require("../config.js")
const footer = config.app.footer

module.exports = {
  name: 'massiverole',
  usage: 'massiverole',
  description: `Permet d'ajouter un role à tous les membres du serveur`,
  async execute(client, message, args) {

    if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

      let color = cl.fetch(`color_${message.guild.id}`)
      if (color == null) color = config.app.color

      if (!args.length) {
        return message.reply("Utilisation: `masiverole add/remove <role>`")
      }
      if (args[0] === "add") {
        const role =
          message.guild.roles.cache.find(
            (role) => role.name === args.join(" ").slice(1)
          ) || message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

            if (!role){
              return message.reply(`Aucun rôle de trouvé pour \`${args[1] || "rien"}\``)
            }

        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
          return message.reply(`Mon rôle n'est pas assez haut pour que j'ajoute le rôle **${role.name}** !`);
        }

        if (message.member.roles.highest.comparePositionTo(role) < 0) {
          return message.reply(`Votre rôle doit être supérieur à **${role.name}**`);
        }

        if (!role) {
          return message.reply(`Veuillez fournir un rôle valide`);
        }

        message.guild.members.cache.forEach(member => member.roles.add(role));

        message.channel.send(`**${role.name}** est en train d'être ajouté à tous les membres du serveur`);
      }
      if (args[0] === "remove") {
        const role =
          message.guild.roles.cache.find(
            (role) => role.name === args.join(" ").slice(1)
          ) || message.mentions.roles.first() || message.guild.roles.cache.get(args.join(" ").slice(1));

        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
          return message.reply(`Mon rôle n'est pas assez haut pour que j'enlève le rôle **${role.name}** !`);
        }

        if (message.member.roles.highest.comparePositionTo(role) < 0) {
          return message.reply(`Votre rôle doit être supérieur à **${role.name}**`);
        }

        if (!role) {
          return message.reply(`Veuillez fournir un rôle valide`);
        }

        message.guild.members.cache.forEach(member => member.roles.remove(role));

        message.channel.send(`** ${role.name} ** est en train d'être retiré à tous les membres du serveur`);
      }
    }
  }
}