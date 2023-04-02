const Discord = require("discord.js")
 const config = require("../config.js")
const db = require('quick.db')
const p = new db.table("Prefix")
const cl = new db.table("Color")
const owner = new db.table("Owner")
const footer = config.app.footer
const paginationEmbed = require('discordjs-button-pagination')
module.exports = {
    name: 'help',
    usage: 'help',
    category: "utils",
    description: `Permet d'afficher l'help.`,
    async execute(client, message, args) {
        const funny = config.app.funny
        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        let img = db.fetch(`img_${message.guild.id}`)
        if (img == null) img = "https://share.creavite.co/NwlEYT8Z9txYAQgb.gif"

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (args[0] === "settings") {

            if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

                let fufu = db.get(`help`)
                if (fufu == null) fufu = "Menu"
                if (fufu == 'help') fufu = "Menu"
                if (fufu == 'helpb') fufu = "Bouton"

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Help Settings`)
                    .setDescription(`Help actuel : \`${fufu}\``)
                    .setColor(color)

                const menu = new Discord.MessageEmbed()
                    .setTitle(`Help Settings`)
                    .setDescription(`Nouveau help : \`Menu\``)
                    .setColor(color)

                const button = new Discord.MessageEmbed()
                    .setTitle(`Help Settings`)
                    .setDescription(`Nouveau help : \`bouton\``)
                    .setColor(color)



                const helpset = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('menu')
                            .setLabel('Menu')
                            .setStyle('SUCCESS')
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('button')
                            .setLabel('Bouton')
                            .setStyle('DANGER')
                    )

                message.channel.send({ embeds: [embed], components: [helpset] }).then(async msg => {

                    const collector = message.channel.createMessageComponentCollector({
                        componentType: "BUTTON",
                        filter: (i => i.user.id === message.author.id)
                    })
                    collector.on("collect", async (c) => {
                        const value = c.customId
                        if (value === "menu") {
                            db.set(`help`, "help")
                            c.reply({ content: `Votre help sera désormais affiché sous forme de **menu**`, ephemeral: true }).catch(() => false)
                            msg.edit({ embeds: [menu] })
                        }

                        else if (value === "button") {
                            db.set(`help`, "helpb")
                            c.reply({ content: `Votre help sera désormais affiché avec des **boutons**`, ephemeral: true }).catch(() => false)
                            msg.edit({ embeds: [button] })
                        }
                    })
                })
                return
            }
        }

        if (args[0] === "msg") {

            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const embed = new Discord.MessageEmbed()
                .setTitle(`Arguments de messages`)
                .setDescription(`Exemple de message simple: \`{MemberMention} nous a rejoint,  nous sommes maintenant {MemberCount} sur {Server}\``)
                .addFields(
                    { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Funny`', inline: true },
                    { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`, inline: true },
                    { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Funny#0666`', inline: true },
                )
                .addFields(
                    { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``, inline: true },
                    { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``, inline: true },
                    { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``, inline: true },
                )
                .addFields(
                    { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``, inline: true },
                    { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``, inline: true },
                    { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``, inline: true },
                )
                .addFields(
                    { name: '{OnlineMembersCount}', value: `Le nombre total de membres en ligne sur le serveur\n\`Exemple: ${message.guild.presences.cache.filter((presence) => presence.status !== "offline").size}\``, inline: true },
                )
                .setColor(color)

            message.channel.send({ embeds: [embed] })
            return
        }

        if (args[0] === "all") {

            const imgperm = "https://share.creavite.co/NwlEYT8Z9txYAQgb.gif"

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            //Embed Help

            const help = new Discord.MessageEmbed()
                .setTitle(`Panel d'aide Permissions ${client.user.username}`)
                .setDescription(`Ce bot appartient à <@${funny}>`)
                .setImage(imgperm)
                .setColor(color)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })


            const public = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Commandes Publiques
\`\`\`
    
    **\`${pf}activity\`**
    **\`${pf}avatar\`**
    **\`${pf}banner\`**
    **\`${pf}help\`**
    **\`${pf}helpall\`**
    **\`${pf}ping\`**
    **\`${pf}find\`**
    **\`${pf}serveur info/pic/banner\`**
    **\`${pf}config\`**
    **\`${pf}snipe\`**
    **\`${pf}support\`**
    **\`${pf}suggest\`**
    **\`${pf}perm\`**
    **\`${pf}gestion\`**
    **\`${pf}bypass\`**
    
              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            //Embed perm1

            const perm1 = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Permission 1
\`\`\`
    
    **\`${pf}voicemute\`**
    **\`${pf}voiceunmute\`**
    **\`${pf}roleinfo\`**
    **\`${pf}mute\`**
    
              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed perm2

            const perm2 = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Permissions 2
\`\`\`
    
    **\`${pf}botlist\`**
    **\`${pf}adminlist\`**
    **\`${pf}rlist\`**
    **\`${pf}hide\`**
    **\`${pf}unhide\`**
    **\`${pf}clear\`**
    
    
    `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)




            //Embed perm3

            const perm3 = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Permission 3
\`\`\`
    
    **\`${pf}lock\`**
    **\`${pf}unlock\`**
    **\`${pf}renew\`**
    **\`${pf}slowmode\`**
    **\`${pf}embed\`**
    **\`${pf}emoji\`**
    **\`${pf}ban\`**
    **\`${pf}kick\`**
    **\`${pf}unban\`**
    
    `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed permgs

            const permgs = new Discord.MessageEmbed()
                .setDescription(`
              
\`\`\`fix
Permission Gestion Staff
\`\`\`
**\`${pf}addrole\`**
**\`${pf}delrole\`**
    
              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed permgp

            const permgp = new Discord.MessageEmbed()
                .setDescription(`
          
\`\`\`fix
Permission Gestion Permissions
\`\`\`
    **\`${pf}pall\`**
    **\`${pf}padmin\`**
    **\`${pf}pban\`**
    **\`${pf}pkick\`**
    **\`${pf}prole\`**
    **\`${pf}pserveur\`**
    **\`${pf}pview\`**
    **\`${pf}pvoc\`**
    **\`${pf}pwebhooks\`**
    
    
          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed permga

            const permga = new Discord.MessageEmbed()
                .setDescription(`
                              
    \`\`\`fix
    Permission Giveaway
    \`\`\`
    **\`${pf}giveaway\`**
    Permet de lancé un Giveaway sur le serveur

    **\`${pf}end [ID]\`**
    Permet de terminé un Giveaway sur le serveur

    **\`${pf}reroll [ID]\`**
    Permet de reroll un Giveaway sur le serveur
                        
                              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

              

            const owner = new Discord.MessageEmbed()
                .setDescription(`
                              
    \`\`\`fix
    Owners
    \`\`\`
    **\`${pf}setalerte\`**
    **\`${pf}alerte\`**
    **\`${pf}alerteping\`**
    **\`${pf}antiadmin on/off\`**
    **\`${pf}antiban on/off\`**
    **\`${pf}antiupdate on/off\`**
    **\`${pf}antibot on/off\`**
    **\`${pf}antidown on/off\`**
    **\`${pf}antilink invite/all/off\`**
    **\`${pf}antieveryone on/off\`**
    **\`${pf}antichannel create on/off\`**
    **\`${pf}antichannel delete on/off\`**
    **\`${pf}antichannel update on/off\`**
    **\`${pf}antirole create on/off\`**
    **\`${pf}antirole delete on/off\`**
    **\`${pf}antirole update on/off\`**
    **\`${pf}antiwebhook on/off\`**
    **\`${pf}server lock/unlock\`**
    **\`${pf}secur\`**
    **\`${pf}secur on/off\`**
    **\`${pf}wl\`**
    **\`${pf}unwl\`**
    **\`${pf}set perm\`**
    **\`${pf}del perm\`**
    **\`${pf}perm list\`**
    **\`${pf}playing\`**
    **\`${pf}stream\`**
    **\`${pf}watch\`**
    **\`${pf}list\`**
    **\`${pf}setcategorie\`**
    **\`${pf}setsuggest\`**
    **\`${pf}soutien\`**
    **\`${pf}boostlog\`**
    **\`${pf}giveawaylog\`**
    **\`${pf}messagelog\`**
    **\`${pf}ticketlog\`**
    **\`${pf}modlog\`**
    **\`${pf}raidlog\`**
    **\`${pf}imghelp\`**
    **\`${pf}muterole\`**
    **\`${pf}annonce\`**
    **\`${pf}derankall\`**
    **\`${pf}mp\`**
    **\`${pf}rolelist\`**
    **\`${pf}ticket\`**
    **\`${pf}ticketset\`**
    **\`${pf}punition\`**
    **\`${pf}join settings\`**
    **\`${pf}join role\`**
    **\`${pf}tempvoc\`**
    **\`${pf}unbanall\`**
    **\`${pf}dero\`**
    
                              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)





                const buyer = new Discord.MessageEmbed()
                .setDescription(`
                              
    \`\`\`fix
    Propriétaire
    \`\`\`
    **\`${pf}leave [Id]\`**
    Permet de faire quitter le bot d'un serveur
    
    **\`${pf}mybot\`**
    Permet d'inviter le bot sur des serveurs
    
    **\`${pf}owner add/remove/list\`**
    Permet de gérer les owners du bot


    
     
                              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


                
            const button1 = new Discord.MessageButton()
                .setCustomId('gauche')
                .setLabel('<<<')
                .setStyle('DANGER');

            const button2 = new Discord.MessageButton()
                .setCustomId('droite')
                .setLabel('>>>')
                .setStyle('DANGER');


            pages = [
                public,
                perm1,
                perm2,
                perm3,
                permgs,
                permgp,
                permga,
                owner,
                buyer,
                help
                
                

            ];

            buttonList = [
                button1,
                button2
            ]

            paginationEmbed(message, pages, buttonList);
            return
        }

        let helpm = db.get(`help`)
        if (helpm == null) helpm = 'help'

        if (helpm == 'help') {

            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('help')
                    .setPlaceholder(`Choisissez une catégorie`)
                    .addOptions([
                        {
                            label: 'Accueil',
                            value: 'accueille',
                            emoji: '<:homee:1072829225427546132>',
                            description: "Retourner à l'Accueil"
                        },
                        {
                            label: 'Owner',
                            value: 'owner',
                            emoji: '<:owner:1072829230271955005>',
                            description: "Premier parametre du bot "
                        },
                        {
                            label: 'Owner 2',
                            value: 'owner2',
                            emoji: '<:coowner:1072829238371168256>',
                            description: "Second paramètre du bot"
                        },
                        {
                            label: 'Propriétaire',
                            value: 'buyer',
                            emoji: '<:tfked:1072829234571120711>',
                            description: "Commande pour les propriétaire du bot"
                        },
                        {
                            label: 'Antiraid',
                            value: 'antiraid',
                            emoji: "<:staff:1072829247166631976>",
                            description: "Proteger son serveur contre les raids"
                        },
                        {
                            label: 'Gestion Permission',
                            value: 'gestion',
                            emoji: "<:admin:1072829243714715720>",
                            description: "Gerer les permissions avec le bot"
                        },
                        {
                            label: 'Utilitaire',
                            value: 'utilitaire',
                            emoji: "<:random:1072829237142233088>",
                            description: "Commande libre sans permission "
                        },
                        {
                            label: 'Musique',
                            value: 'music',
                            emoji: "<:music:1072829242036990022>",
                            description: "Écouter de la musique avec le bot"
                        },
                        {
                            label: 'Modération',
                            value: 'moderation',
                            emoji: "<:servers:1070764831940034580>",
                            description: "Commandes modération"
                        },
                        {
                            label: 'Logs',
                            value: 'logs',
                            emoji: "<:logs:1072829232822091897>",
                            description: "Configurer les logs avec le bot"
                        },
                        {
                            label: 'Giveaway',
                            value: 'giveaway',
                            emoji: "<:gift1:1072829228011245598>",
                            description: "Faire des giveaways avec le bot"
                        },
                        {
                            label: 'Jeux',
                            value: 'jeux',
                            emoji: "<:game:1072829245803475065>",
                            description: "Commande pour jouer"
                        },
                       {
                            label: 'Activity', 
                            value: 'activity',
                            emoji: "<:utilities:1072829239730130995>",
                            description: "Activité discord"
                        }
                    

                        
                    ])
            )

            //Embed Help

            const Help = new Discord.MessageEmbed()
                .setTitle(`Panel d'aide de ${client.user.username}`)
                .setDescription(`Ce bot appartient à <@${funny}>`)
                .setImage(img)
                .setColor(color)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })

          

            const Owner = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Owner bot
\`\`\`

**\`${pf}setalerte [ID]\`**
Permet de mettre en place un salon d'alerte lorsqu'une permission administrateur sera ajouté à un membre

**\`${pf}alerte\`**
Permet de choisir les perms pour les quels il faudra ping dans le salon alerte

**\`${pf}alerteping [@]\`**
Permet de choisir quel role sera mentionner lors de alertes permissions administrateurs

**\`${pf}soutien\`**
Permet de choisir un role et un statut de soutien afin de récompenser les membres qui ont le statut

**\`${pf}imghelp [lien]\`**
Permet de choisir quelle image/gif sera affiché dans l'accueil du help

**\`${pf}muterole\`**
Met en place un role muet sur le serveur

**\`${pf}wl/unwl\`**
Permet de gérer la whitelist du bot

**\`${pf}transcript\`**
Recupère tous les messages d'un salon

**\`${pf}ticket\`**
Permet de créer un système de ticket personnalisé sur le serveur

**\`${pf}ticketset\`**
Créer un système ticket pré défini

**\`${pf}permticket\`**
Permet de configuré un role qui aura accès aux tickets

**\`${pf}setcategorie\`**
Permet de séléctionner la catégorie ou seront ouvert les tickets

**\`${pf}massiverole add/remove\`**
Donne ou retire un role à tous les membres du serveur

**\`${pf}derankall\`**
Derank toutes les personnes ayant des Permissions Dangereuses sur le serveur

**\`${pf}embed\`**
Créer un embed grace à l'embed builder

**\`${pf}buttonrole <role> <description>\`**
Créer un embed pour que les gens puissent cliqué pour avoir un role

**\`${pf}prefix\`**
Change le prefix du bot

**\`${pf}dero <@role>\`**
Permet de configuré un role avec un maximum de dérogations pour les owners [Gérer les roles/Gérer les salons/Renommer des membres/etc]
Cela permet d'éviter d'attribué des permissions administrateurs et les membres possédant ce role pourront avoir accès à 80% comme une perm admin
Faites attention de ne quand meme pas attribué cette permission à n'importe quel role

          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            //Embed Owner2

            const Owner2 = new Discord.MessageEmbed()
                .setDescription(`

\`\`\`fix
Owner bot partie 2
\`\`\`
                
**\`${pf}stream/playing/listen/watch <statut>\`**
Change le statut du bot
                
**\`${pf}pfp\`**
Permet d'activé ou désactuvé le mode pfps sur un salon
                
**\`${pf}mp\`**
Permet d'envoyer un message privé à un membre via le bot
                
**\`${pf}theme\`**
Permet de changer le theme couleur du bot
                
**\`${pf}punition derank/kick/ban\`**
Permet de choisir la punition qui sera éxécuté lors des raid
                
**\`${pf}bl/unbl\`**
Permet de gérer la blacklist
                
**\`${pf}perm list\`**
Affiche la configuration des perms configurés sur le serveur
                
**\`${pf}set/del perm1/2/3/gs/gp/ga <role>\`**
Permet de configurer le niveau de permission associé à un role
                
**\`${pf}say <message>\`**
Faire parler de bot dans un salon textuel
                
**\`${pf}lock all\`**
Permet de fermé tous les salons du serveur
                
**\`${pf}unlock all\`**
Permet de d'ouvrir tous les salons du serveur
                
**\`${pf}join settings\`**
Permet de configurer les paramètres du join settings
                
**\`${pf}join role <role>\`**
Attribue un role automatiquement aux membres qui rejoignent le serveur
                
**\`${pf}join channel <#/ID>\`**
Salon dans le quel seront envoyés les messages de bienvenue
                
**\`${pf}tempvoc\`**
Affiche un menu interactif pour gérer les vocaux temporaires sur le serveur
                
**\`${pf}antijoin add/remove <ID>\`**
Empeche l'accès à un salon vocal sauf pour les membres vl/wl/owner
                
**\`${pf}vl/unvl <@/ID>\`**
Les membres vl seront autorisés à rejoindre les vocaux interdit
                
**\`${pf}blv/unblv/ <@/ID>\`**
Blacklist vocal un membre du serveur, il ne pourra rejoindre aucun salon vocal

**\`${pf}help settings\`**
Change le format du help avec des boutons ou des menus

**\`${pf}invite-s \`**
Donne une invite pour le serveur, invite-s + numéro du serveur dans la commande serverlist

                `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            //Embed Gestion

            const Gestion = new Discord.MessageEmbed()
                .setTitle("Gestion Permission")
                .setDescription(`
 \`\`\`fix
 Permet de controler les permissions du serveur
 \`\`\`

 **\`${pf}perm\`**
Affiche les permissions d'un membre sur le serveur

**\`${pf}gestion\`**
Affiche les différents modules des gestion et leurs utilités

**\`${pf}pall\`**
Désactive __toutes les permissions__ du serveur 

**\`${pf}padmin\`**
Désactive toutes les permissions __administateur__ du serveur

**\`${pf}prole\`**
Désactive toutes les permissions __roles__ du serveur

**\`${pf}pban\`**
Désactive toutes les permissions __ban__ du serveur

**\`${pf}pkick\`**
Désactive toutes les permissions __kick__ du serveur

**\`${pf}pvoc\`**
Désactive toutes les permissions __voc__ du serveur

**\`${pf}pwebhooks\`**
Désactive toutes les permissions __webhooks__ du serveur

**\`${pf}pviewc\`**
Désactive toutes les permissions __voir les salons__ du serveur

**\`${pf}pserveur\`**
Désactive toutes les permissions __Gérer le serveur__ du serveur

**\`${pf}peveryone\`**
Désactive toutes les permissions __Everyone__ du serveur

`)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)




            //Embed Modération

            const moderation = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Modération
\`\`\`

**\`${pf}adminlist\`**
Affiche la liste des personnes ayant la permission __Administrateur__

**\`${pf}botlist\`**
Affiche la liste de tous les bots présent sur le serveur

**\`${pf}rlist\`**
Affiche la liste des personnes ayant la permission __Gérer les roles__

**\`${pf}mute\`**
Rends muet un membre

**\`${pf}unmute\`**
Redonne la parole un membre

**\`${pf}emoji\`**
Permet de créer un émoji sur le serveur

**\`${pf}hide\`**
Permet de cacher un salon

**\`${pf}unhide\`**
Permet de rendre visible un salon

**\`${pf}lock\`**
Permet de fermé un salon

**\`${pf}unlock\`**
Permet d'ouvrir un salon

**\`${pf}config\`**
Afficher la configuration du bot sur le serveur

**\`${pf}addrole\`**
Permet d'ajouter un role à un membre

**\`${pf}delrole\`**
Retire un role à un membre

**\`${pf}annonce\`**
Permet de faire une annonce de l'administration

**\`${pf}kick\`**
Expulse un membre du serveur

**\`${pf}ban\`**
Ban un membre du serveur

**\`${pf}clear <nombre>\`**
Supprime 1 ou plusieurs messages

**\`${pf}renew\`**
Recrée un salon à l'identique

**\`${pf}slowmode\`**
Met en place un mode lent sur un salon

**\`${pf}voicemute\`**
Mute un membre en vocal

**\`${pf}voiceunmute\`**
Unmute un membre en vocal

**\`${pf}unban <id>\`**
Unban un membre du serveur

**\`${pf}unbanall\`**
Unban tous les membres du serveur

`)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed Utilitaire

            const Utilitaire = new Discord.MessageEmbed()
                .setTitle("Utilitaire")
                .setDescription(`
          
\`\`\`fix
Commandes Public
\`\`\`
**\`${pf}help\`**
Vous permet d'obtenir l'intégralité des commandes du bot et leurs informations

**\`${pf}help all\`**
Vous permet d'obtenir l'intégralité des commandes assignées aux role selons leurs niveaux de permissions

**\`${pf}help msg\`**
Affiche la totalité des variables messages

**\`${pf}ping\`**
Permet d'afficher le ping du bot

**\`${pf}avatar [id/mention]\`**
Permet d'obtenir l'avatar d'un membre

**\`${pf}banner [id/mention]\`**
Donne la bannière d'un membre

**\`${pf}serveur info\`**
Permet d'obtenir les informations du serveur

**\`${pf}serveur pic\`**
Donne la pp du serveur

**\`${pf}serveur banner\`**
Donne la bannière du serveur

**\`${pf}roleinfo [role]\`**
Permet d'obtenir des informations sur un role

**\`${pf}find [@/ID]\`**
Cherche un membre en vocal sur le serveur

**\`${pf}snipe\`**
Afficher le dernier message supprimé dans le salon

**\`${pf}suggest\`**
Permet de faire une suggestion sur le serveur

**\`${pf}userinfo\`**
Permet d'avoir des informations sur un utilisateur

**\`${pf}bypass\`**
Permet de savoir quel antiraid est bypass par quelle niveau de permission

**\`${pf}vc\`**
Affiche les statistiques du serveur

          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed activity

            const activity = new Discord.MessageEmbed()
                .setDescription(`
      
\`\`\`fix
Activity Together
\`\`\`
**\`${pf}activity\`**
Permet de lancer une activitée dans votre salon vocal

**__Activitées disponibles :__**
\`Youtube\`
\`Poker\`
\`Chess\`
\`Checkers in the Park\`
\`Betrayal\`
\`Fishington\`
\`Letter Tile\`
\`Words Snack\`
\`Doodle Crew\`
\`SpellCast\`
\`Awkord\`
\`Puttparty\`
\`Sketchheads\`
\`Ocho\`

      `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed logs

            const logs = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Logs du serveur
\`\`\`
**\`${pf}presetlogs\`**
Créer et configure automatiquement tous les salons logs

**\`${pf}messagelog\`**
Affiche toutes les logs des messages supprimés ou édités

**\`${pf}modlog\`**
Affiche toutes les logs des actions de modération

**\`${pf}ticketlog\`**
Affiche les logs des tickets

**\`${pf}giveawaylog\`**
Affiche les logs de chaque Giveaway lancé dans le serveur

**\`${pf}boostlog\`**
Affiche une log dès qu'une personne boostera le serveur

**\`${pf}raidlog\`**
Permet d'afficher les logs des embeds supprimés

**\`${pf}setsuggest\`**
Salon qui sera utilisé pour envoyé toutes les suggestions proposés par les membres
                    

                    
                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            const giveaway = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Giveaway
\`\`\`
**\`${pf}giveaway <salon> <temps> <nombre winners> <Gain>\`**
Permet de lancer un Giveaway sur le serveur

**\`${pf}end [ID]\`**
Permet de terminé un Giveaway sur le serveur

**\`${pf}reroll [ID]\`**
Permet de reroll un Giveaway sur le serveur

                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            const jeux = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Jeux
\`\`\`
**\`${pf}8ball <question>\`**
**\`${pf}ascii <text>\`**
**\`${pf}catsay <text>\`**
**\`${pf}click\`**
**\`${pf}combat\`**
**\`${pf}gif\`**
**\`${pf}gay\`**
**\`${pf}hack\`**
**\`${pf}insta\`**
**\`${pf}mot\`**
**\`${pf}gunfight\`**
**\`${pf}puissance4\`**
**\`${pf}snake\`**


                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            const antiraid = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Configuration de l'Antiraid
\`\`\`

**\`${pf}secur\`**
Configurer les protections de l'antiraid sur le serveur

**\`${pf}secur on\`**
Active toutes les protections de l'antiraid

**\`${pf}secur off\`**
Désactive toutes les protections de l'antiraid

**\`${pf}punition\`**
Permet de choisir la punition si un membre non owner/wl tente de faire une action non autorisé

**\`${pf}antiadmin on/off\`**
**\`${pf}antiban on/off\`**
**\`${pf}antiupdate on/off\`**
**\`${pf}antibot on/off\`**
**\`${pf}antidown on/off\`**
**\`${pf}antilink invite/all/off\`**
**\`${pf}antieveryone on/off\`**
**\`${pf}antichannel create on/off\`**
**\`${pf}antichannel delete on/off\`**
**\`${pf}antichannel update on/off\`**
**\`${pf}antirole create on/off\`**
**\`${pf}antirole delete on/off\`**
**\`${pf}antirole update on/off\`**
**\`${pf}antiwebhook on/off\`**
**\`${pf}server lock/unlock\`**


                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            const music = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Musique
\`\`\`
**\`${pf}play <nom/url musique>\`**
Permet d'écouter de la musique sur un serveur

**\`${pf}pause\`**
Permet de mettre en pause la musique actuelle

**\`${pf}resume\`**
Permet de remettre en lecture la musique mise en pause

**\`${pf}stop\`**
Permet d'arreter la musique

**\`${pf}volume <0/150>\`**
Permet de régler le volume de la musique

                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            const proprio = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Propriétaire du bot
\`\`\`
**\`${pf}mybot\`**
Obtenir une invitation de votre bot

**\`${pf}owner\`**
Permet de mettre owner un membre __Attention les owners peuvent faire toutes les commandes__

**\`${pf}unowner\`**
Permet de retirer un membre des owners

**\`${pf}reboot\`**
Permet de redémarrer le bot

**\`${pf}serverlist\`**
Permet d'obtenir la liste des servers où se trouvent le bot

**\`${pf}setavatar <image>\`**
Change la pp du bot

**\`${pf}setname <Nouveau Nom>\`**
Change le nom du bot


                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            message.channel.send({ embeds: [Help], components: [row] }).then(async msg => {

                const collector = message.channel.createMessageComponentCollector({
                    componentType: "SELECT_MENU",
                    filter: (i => i.user.id === message.author.id)
                });
                collector.on("collect", async (collected) => {
                    collected.deferUpdate().catch(() => false)
                    const value = collected.values[0];

                    if (value === "accueille") {
                        msg.edit({ embeds: [Help], components: [row] });
                    }
                    if (value === "owner") {
                        msg.edit({ embeds: [Owner], components: [row] });
                    }
                    if (value === "owner2") {
                        msg.edit({ embeds: [Owner2], components: [row] });
                    }
                    if (value === "buyer") {
                        msg.edit({ embeds: [proprio], components: [row] });
                    }
                    if (value === "antiraid") {
                        msg.edit({ embeds: [antiraid], components: [row] });
                    }
                    if (value === "gestion") {
                        msg.edit({ embeds: [Gestion], components: [row] });
                    }
                    if (value === "moderation") {
                        msg.edit({ embeds: [moderation], components: [row] });
                    }
                    if (value === "utilitaire") {
                        msg.edit({ embeds: [Utilitaire], components: [row] });
                    }
                    if (value === "music") {
                        msg.edit({ embeds: [music], components: [row] });
                    }
                    if (value === "logs") {
                        msg.edit({ embeds: [logs], components: [row] });
                    }
                    if (value === "giveaway") {
                        msg.edit({ embeds: [giveaway], components: [row] });
                    }
                    if (value === "jeux") {
                        msg.edit({ embeds: [jeux], components: [row] });
                    }
                    if (value === "activity") {
                        msg.edit({ embeds: [activity], components: [row] });    
                    }
                    
                   
                })
            })
        }



        if (db.get(`help`) === 'helpb') {

            const Help = new Discord.MessageEmbed()
                .setTitle(`Panel d'aide de ${client.user.username}`)
                .setDescription(`Ce bot appartient à <@1055889359334813847>`)
                .setImage(img)
                .setColor(color)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })

            //Embed Owner

            const Owner = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Owner bot
\`\`\`

**\`${pf}setalerte [ID]\`**
Permet de mettre en place un salon d'alerte lorsqu'une permission administrateur sera ajouté à un membre

**\`${pf}alerte\`**
Permet de choisir les perms pour les quels il faudra ping dans le salon alerte

**\`${pf}alerteping [@]\`**
Permet de choisir quel role sera mentionner lors de alertes permissions administrateurs

**\`${pf}soutien\`**
Permet de choisir un role et un statut de soutien afin de récompenser les membres qui ont le statut

**\`${pf}imghelp [lien]\`**
Permet de choisir quelle image/gif sera affiché dans l'accueil du help

**\`${pf}muterole\`**
Met en place un role muet sur le serveur

**\`${pf}wl/unwl\`**
Permet de gérer la whitelist du bot

**\`${pf}transcript\`**
Recupère tous les messages d'un salon

**\`${pf}ticket\`**
Permet de créer un système de ticket personnalisé sur le serveur

**\`${pf}ticketset\`**
Créer un système ticket pré défini

**\`${pf}permticket\`**
Permet de configuré un role qui aura accès aux tickets

**\`${pf}setcategorie\`**
Permet de séléctionner la catégorie ou seront ouvert les tickets

**\`${pf}massiverole add/remove\`**
Donne ou retire un role à tous les membres du serveur

**\`${pf}derankall\`**
Derank toutes les personnes ayant des Permissions Dangereuses sur le serveur

**\`${pf}embed\`**
Créer un embed grace à l'embed builder

**\`${pf}buttonrole <role> <description>\`**
Créer un embed pour que les gens puissent cliqué pour avoir un role

**\`${pf}prefix\`**
Change le prefix du bot

**\`${pf}dero <@role>\`**
Permet de configuré un role avec un maximum de dérogations pour les owners [Gérer les roles/Gérer les salons/Renommer des membres/etc]
Cela permet d'éviter d'attribué des permissions administrateurs et les membres possédant ce role pourront avoir accès à 80% comme une perm admin
Faites attention de ne quand meme pas attribué cette permission à n'importe quel role

          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            //Embed Owner2

            const Owner2 = new Discord.MessageEmbed()
                .setDescription(`

**\`${pf}stream/playing/listen/watch <statut>\`**
Change le statut du bot
                
**\`${pf}pfp\`**
Permet d'activé ou désactuvé le mode pfps sur un salon
                
**\`${pf}mp\`**
Permet d'envoyer un message privé à un membre via le bot
                
**\`${pf}theme\`**
Permet de changer le theme couleur du bot
                
**\`${pf}punition\`**
Permet de choisir la punition qui sera éxécuté lors des raid
                
**\`${pf}bl/unbl\`**
Permet de gérer la blacklist
                
**\`${pf}perm list\`**
Affiche la configuration des perms configurés sur le serveur
                
**\`${pf}set/del perm1/2/3/gs/gp/ga <role>\`**
Permet de configurer le niveau de permission associé à un role
                
**\`${pf}say <message>\`**
Faire parler de bot dans un salon textuel
                
**\`${pf}lock all\`**
Permet de fermé tous les salons du serveur
                
**\`${pf}unlock all\`**
Permet de d'ouvrir tous les salons du serveur
                
**\`${pf}join settings\`**
Permet de configurer les paramètres du join settings
                
**\`${pf}join role <role>\`**
Attribue un role automatiquement aux membres qui rejoignent le serveur
                
**\`${pf}join channel <#/ID>\`**
Salon dans le quel seront envoyés les messages de bienvenue
                
**\`${pf}tempvoc\`**
Affiche un menu interactif pour gérer les vocaux temporaires sur le serveur
                
**\`${pf}antijoin <ID>\`**
Empeche l'accès à un salon vocal sauf pour les membres vl/wl/owner
                
**\`${pf}vl/unvl <@/ID>\`**
Les membres vl seront autorisés à rejoindre les vocaux interdit
                
**\`${pf}blv/unblv/ <@/ID>\`**
Blacklist vocal un membre du serveur, il ne pourra rejoindre aucun salon vocal

**\`${pf}help settings\`**
Change le format du help avec des boutons ou des menus


                `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed Gestion

            const Gestion = new Discord.MessageEmbed()
                .setTitle("Gestion Permission")
                .setDescription(`
 \`\`\`fix
 Permet de controler les permissions du serveur
 \`\`\`

 **\`${pf}perm\`**
Affiche les permissions d'un membre sur le serveur

**\`${pf}gestion\`**
Affiche les différents modules des gestion et leurs utilités

**\`${pf}pall\`**
Désactive __toutes les permissions__ du serveur 

**\`${pf}padmin\`**
Désactive toutes les permissions __administateur__ du serveur

**\`${pf}prole\`**
Désactive toutes les permissions __roles__ du serveur

**\`${pf}pban\`**
Désactive toutes les permissions __ban__ du serveur

**\`${pf}pkick\`**
Désactive toutes les permissions __kick__ du serveur

**\`${pf}pvoc\`**
Désactive toutes les permissions __voc__ du serveur

**\`${pf}pwebhooks\`**
Désactive toutes les permissions __webhooks__ du serveur

**\`${pf}pviewc\`**
Désactive toutes les permissions __voir les salons__ du serveur

**\`${pf}pserveur\`**
Désactive toutes les permissions __Gérer le serveur__ du serveur

**\`${pf}peveryone\`**
Désactive toutes les permissions __Everyone__ du serveur

`)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)




            //Embed Modération

            const moderation = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Modération
\`\`\`

**\`${pf}adminlist\`**
Affiche la liste des personnes ayant la permission __Administrateur__

**\`${pf}botlist\`**
Affiche la liste de tous les bots présent sur le serveur

**\`${pf}rlist\`**
Affiche la liste des personnes ayant la permission __Gérer les roles__

**\`${pf}mute\`**
Rends muet un membre

**\`${pf}unmute\`**
Redonne la parole un membre

**\`${pf}emoji\`**
Permet de créer un émoji sur le serveur

**\`${pf}hide\`**
Permet de cacher un salon

**\`${pf}unhide\`**
Permet de rendre visible un salon

**\`${pf}lock\`**
Permet de fermé un salon

**\`${pf}unlock\`**
Permet d'ouvrir un salon

**\`${pf}config\`**
Afficher la configuration du bot sur le serveur

**\`${pf}addrole\`**
Permet d'ajouter un role à un membre

**\`${pf}delrole\`**
Retire un role à un membre

**\`${pf}annonce\`**
Permet de faire une annonce de l'administration

**\`${pf}kick\`**
Expulse un membre du serveur

**\`${pf}ban\`**
Ban un membre du serveur

**\`${pf}clear <nombre>\`**
Supprime 1 ou plusieurs messages

**\`${pf}renew\`**
Recrée un salon à l'identique

**\`${pf}slowmode\`**
Met en place un mode lent sur un salon

**\`${pf}voicemute\`**
Mute un membre en vocal

**\`${pf}voiceunmute\`**
Unmute un membre en vocal

**\`${pf}unban <id>\`**
Unban un membre du serveur

**\`${pf}unbanall\`**
Unban tous les membres du serveur

`)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed Utilitaire

            const Utilitaire = new Discord.MessageEmbed()
                .setTitle("Utilitaire")
                .setDescription(`
          
\`\`\`fix
Commandes Public
\`\`\`
**\`${pf}help\`**
Vous permet d'obtenir l'intégralité des commandes du bot et leurs informations

**\`${pf}helpall\`**
Vous permet d'obtenir l'intégralité des commandes assignées aux role selons leurs niveaux de permissions

**\`${pf}helpmsg\`**
Affiche la totalité des variables messages

**\`${pf}ping\`**
Permet d'afficher le ping du bot

**\`${pf}support\`**
Si vous cherchez des bots personnalisé en tout genre notre support vous propose des bots sur demande

**\`${pf}avatar [id/mention]\`**
Permet d'obtenir l'avatar d'un membre

**\`${pf}banner [id/mention]\`**
Permet d'obtenir la bannière d'un membre

**\`${pf}serveur info\`**
Permet d'obtenir les informations du serveur

**\`${pf}serveur pic\`**
Permet d'obtenir la pp du serveur

**\`${pf}serveur banner\`**
Permet d'obtenir la bannière du serveur

**\`${pf}roleinfo [role]\`**
Permet d'obtenir des informations sur un role

**\`${pf}find [@/ID]\`**
Permet de chercher un membre en vocal sur le serveur

**\`${pf}snipe\`**
Permet d'afficher le dernier message supprimé dans le salon

**\`${pf}suggest\`**
Permet de faire une suggestion sur le serveur

**\`${pf}userinfo\`**
Permet d'avoir des informations sur un utilisateur

**\`${pf}vc\`**
Affiche les statistiques du serveur

          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed activity

            const activity = new Discord.MessageEmbed()
                .setDescription(`
      
\`\`\`fix
Activity Together
\`\`\`
**\`${pf}activity\`**
Permet de lancer une activitée dans votre salon vocal

**__Activitées disponibles :__**
\`Youtube\`
\`Poker\`
\`Chess\`
\`Checkers in the Park\`
\`Betrayal\`
\`Fishington\`
\`Letter Tile\`
\`Words Snack\`
\`Doodle Crew\`
\`SpellCast\`
\`Awkord\`
\`Puttparty\`
\`Sketchheads\`
\`Ocho\`

      `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed logs

            const logs = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Logs du serveur
\`\`\`
**\`${pf}presetlogs\`**
Créer et configure automatiquement tous les salons logs

**\`${pf}messagelog\`**
Affiche toutes les logs des messages supprimés ou édités

**\`${pf}modlog\`**
Affiche toutes les logs des actions de modération

**\`${pf}ticketlog\`**
Affiche les logs des tickets

**\`${pf}giveawaylog\`**
Affiche les logs de chaque Giveaway lancé dans le serveur

**\`${pf}boostlog\`**
Affiche une log dès qu'une personne boostera le serveur

**\`${pf}raidlog\`**
Permet d'afficher les logs des embeds supprimés

**\`${pf}setsuggest\`**
Salon qui sera utilisé pour envoyé toutes les suggestions proposés par les membres
                    

                    
                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            const giveaway = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Giveaway
\`\`\`
**\`${pf}giveaway <salon> <temps> <nombre winners> <Gain>\`**
Permet de lancer un Giveaway sur le serveur

**\`${pf}end [ID]\`**
Permet de terminé un Giveaway sur le serveur

**\`${pf}reroll [ID]\`**
Permet de reroll un Giveaway sur le serveur

                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            const jeux = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Jeux
\`\`\`
**\`${pf}8ball <question>\`**
**\`${pf}ascii <text>\`**
**\`${pf}catsay <text>\`**
**\`${pf}click\`**
**\`${pf}combat\`**
**\`${pf}gif\`**
**\`${pf}gay\`**
**\`${pf}hack\`**
**\`${pf}insta\`**
**\`${pf}mot\`**
**\`${pf}gunfight\`**
**\`${pf}puissance4\`**
**\`${pf}snake\`**


                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            const antiraid = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Configuration de l'Antiraid
\`\`\`

**\`${pf}secur\`**
Configurer les protections de l'antiraid sur le serveur

**\`${pf}secur on\`**
Active toutes les protections de l'antiraid

**\`${pf}secur off\`**
Désactive toutes les protections de l'antiraid

**\`${pf}punition\`**
Permet de choisir la punition si un membre non owner/wl tente de faire une action non autorisé

**\`${pf}antiadmin on/off\`**
**\`${pf}antiban on/off\`**
**\`${pf}antiupdate on/off\`**
**\`${pf}antibot on/off\`**
**\`${pf}antidown on/off\`**
**\`${pf}antilink invite/all/off\`**
**\`${pf}antieveryone on/off\`**
**\`${pf}antichannel create on/off\`**
**\`${pf}antichannel delete on/off\`**
**\`${pf}antichannel update on/off\`**
**\`${pf}antirole create on/off\`**
**\`${pf}antirole delete on/off\`**
**\`${pf}antirole update on/off\`**
**\`${pf}antiwebhook on/off\`**
**\`${pf}server lock/unlock\`**


                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            const music = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Musique
\`\`\`
**\`${pf}play <nom/url musique>\`**
Permet d'écouter de la musique sur un serveur

**\`${pf}pause\`**
Permet de mettre en pause la musique actuelle

**\`${pf}resume\`**
Permet de remettre en lecture la musique mise en pause

**\`${pf}stop\`**
Permet d'arreter la musique

**\`${pf}volume <0/150>\`**
Permet de régler le volume de la musique

                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            const proprio = new Discord.MessageEmbed()
                .setDescription(`
                          
\`\`\`fix
Propriétaire du bot
\`\`\`
**\`${pf}mybot\`**
Obtenir une invitation de votre bot

**\`${pf}owner\`**
Permet de mettre owner un membre __Attention les owners peuvent faire toutes les commandes__

**\`${pf}unowner\`**
Permet de retirer un membre des owners

**\`${pf}reboot\`**
Permet de redémarrer le bot

**\`${pf}serverlist\`**
Permet d'obtenir la liste des servers où se trouvent le bot

**\`${pf}setavatar <image>\`**
Change la pp du bot

**\`${pf}setname <Nouveau Nom>\`**
Change le nom du bot

                          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            const button1 = new Discord.MessageButton()
                .setCustomId('gauche')
                .setEmoji('<:gauche:1072948742589784204>')
                .setStyle('DANGER');

            const button2 = new Discord.MessageButton()
                .setCustomId('droite')
                .setEmoji('<:droite:1072948652869423205>')
                .setStyle('DANGER');


            pages = [
                Help,
                Owner,
                Owner2,
                Gestion,
                moderation,
                Utilitaire,
                logs,
                giveaway,
                jeux,
                antiraid,
                proprio,
                activity
               

            ];

            buttonList = [
                button1,
                button2
            ]

            paginationEmbed(message, pages, buttonList);

        }
            
    }
}