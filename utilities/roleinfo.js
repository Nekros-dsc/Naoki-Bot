const ms = require('ms')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
 const config = require("../config.js")
const footer = config.app.footer
const db = require('quick.db')
const cl = new db.table("Color")
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const owner = new db.table("Owner")

module.exports = {
    name: 'roleinfo',

    async execute(client, message, args) {

      let color = cl.fetch(`color_${message.guild.id}`)
      if (color == null) color = config.app.color

      const perm1 = p1.fetch(`perm1_${message.guild.id}`)
      const perm2 = p2.fetch(`perm2_${message.guild.id}`)
      const perm3 = p3.fetch(`perm3_${message.guild.id}`)

      if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send({content: 'Veuillez préciser un role'})
        
            
        const perms = {
            ADMINISTRATOR: "Administrateur",
            MANAGE_GUILD: `Gérer le serveur`,
            MANAGE_ROLES: `Gérer les rôles`,
            MANAGE_CHANNELS: `Gérer les salons`,
            KICK_MEMBERS: `Expulser des membres`,
            BAN_MEMBERS: `Bannir des membres`,
            MANAGE_WEBHOOKS: `Gérer les webhooks\n`,
            VIEW_AUDIT_LOG:``,
            CREATE_INSTANT_INVITE: ``,
            CHANGE_NICKNAME: ``,
            MANAGE_NICKNAMES:``,
            MANAGE_EMOJIS: ``,
            VIEW_CHANNEL: ``,
            SEND_MESSAGES: ``,
            SEND_TTS_MESSAGES: ``,
            MANAGE_MESSAGES: ``,
            EMBED_LINKS:``,
            ATTACH_FILES: ``,
            READ_MESSAGE_HISTORY: ``,
              USE_EXTERNAL_EMOJIS: ``,
            ADD_REACTIONS: ``,
            CONNECT: ``,
            SPEAK: ``,
            MUTE_MEMBERS: ``,
            DEAFEN_MEMBERS: ``,
            MOVE_MEMBERS: ``,
            USE_VAD:``,
            MENTION_EVERYONE: `Mentionner @everyone, @here et tous les rôles`,
          
          }
          const allPermissions = Object.entries(role.permissions.serialize()).filter(perm => perm[1]).map(([perm]) =>{ if(perm.includes("ADMINISTRATOR")){return `Administrateur`} else {perms[perm]}}).join("")
        
            const roleEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .addField("Nom ", `<@&${role.id}>`)
            .addField("Membres possédant le rôle", `${role.members.size}`, true)
            .addField("Couleur", `${role.hexColor ==="#000000" ? "Classique":role.hexColor}`, true)
            .addField("ID", `${role.id}`, true)
            .addField("Affiché séparément", `${role.hoist ? "Oui":"Non"}`, true)
            .addField("Mentionable", `${role.mentionable? "Oui":"Non"}`, true)
            .addField("Géré par une intégration", `${role.managed? "Oui":"Non"}`, true)
            .addField("Permissions principales", `${allPermissions || "Aucune"}`)
            .setFooter({text: `${footer}`})
         
            message.channel.send({embeds: [roleEmbed]})
        } 
    }
  }
        
    
        
         // VIEW_AUDIT_LOG:`Voir les logs du serveur`,
        
                // CREATE_INSTANT_INVITE: `Créer une invitations`,
            // CHANGE_NICKNAME: `Changer le pseudo`,
            // MANAGE_NICKNAMES: `Gérer les pseudos`,
            // MANAGE_EMOJIS: `Gérer les émojis`,
            // VIEW_CHANNEL: `Lire les salons textuels & voir les salons vocaux`,
            // SEND_MESSAGES: `Envoyer des messages`,
            // SEND_TTS_MESSAGES: `Envoyer des messages TTS`,
            // MANAGE_MESSAGES: `Gérer les messages`,
            // EMBED_LINKS: `Intégrer des liens`,
            // ATTACH_FILES: `Joindre des fichiers`,
            // READ_MESSAGE_HISTORY: `Voir les anciens messages`,
              // USE_EXTERNAL_EMOJIS: `Utiliser des émojis externe`,
            // ADD_REACTIONS: `Ajouter des réactions`,
            // CONNECT: `Se connecter`,
            // SPEAK: `Parler`,
            // MUTE_MEMBERS: `Couper les micros de membres`,
            // DEAFEN_MEMBERS: `Mettre en sourdine des membres`,
            // MOVE_MEMBERS: `Déplacer des membres`,
            // USE_VAD: `Utiliser la détection de la voix`