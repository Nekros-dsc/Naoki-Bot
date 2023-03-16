const { Client, Intents, guild, Collection } = require('discord.js');
const Discord = require("discord.js")
const config = require('./config')
const { readdirSync } = require("fs")
const db = require('quick.db')
const p = new db.table("Prefix")
const logembed = new db.table("embedlog")
const { Player } = require('discord-player');
ms = require("ms")
const color = config.app.color
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    restTimeOffset: 0,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

client.login(config.app.token);
client.commands = new Collection();

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  modération Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const commandFiles = readdirSync('./moderation').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./moderation/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  gestion Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const gestionFiles = readdirSync('./gestion').filter(file => file.endsWith('.js'));
for (const file of gestionFiles) {
    const command = require(`./gestion/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  utilities Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const utilitiesFiles = readdirSync('./utilities').filter(file => file.endsWith('.js'));
for (const file of utilitiesFiles) {
    const command = require(`./utilities/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  administration Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const administrationFiles = readdirSync('./administration').filter(file => file.endsWith('.js'));
for (const file of administrationFiles) {
    const command = require(`./administration/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  owner Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const ownerFiles = readdirSync('./owner').filter(file => file.endsWith('.js'));
for (const file of ownerFiles) {
    const command = require(`./owner/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  logs Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const logsFiles = readdirSync('./logs').filter(file => file.endsWith('.js'));
for (const file of logsFiles) {
    const command = require(`./logs/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  giveaway Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const giveawayFiles = readdirSync('./giveaway').filter(file => file.endsWith('.js'));
for (const file of giveawayFiles) {
    const command = require(`./giveaway/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  games Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const gamesFiles = readdirSync('./games').filter(file => file.endsWith('.js'));
for (const file of gamesFiles) {
    const command = require(`./games/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  antiraid Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const antiraidFiles = readdirSync('./antiraid').filter(file => file.endsWith('.js'));
for (const file of antiraidFiles) {
    const command = require(`./antiraid/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  buyer Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const buyerFiles = readdirSync('./buyer').filter(file => file.endsWith('.js'));
for (const file of buyerFiles) {
    const command = require(`./buyer/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  music Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const musicFiles = readdirSync('./music').filter(file => file.endsWith('.js'));
for (const file of musicFiles) {
    const command = require(`./music/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  voice Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const voiceFiles = readdirSync('./voice').filter(file => file.endsWith('.js'));
for (const file of voiceFiles) {
    const command = require(`./voice/${file}`);
    client.commands.set(command.name, command);
}



//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}


client.on('messageDelete', async message => {
    if (!message.embeds.toString()) return

    db.set(message.channel.id, message.embeds[0].toJSON())

    const button = new Discord.MessageButton()
    button.setCustomId(message.channel.id)
    button.setLabel('📜')
    button.setStyle('PRIMARY')

    const button2 = new Discord.MessageButton()
    button2.setCustomId(message.channel.id)
    button2.setLabel('📜')
    button2.setStyle('PRIMARY')
    button2.setDisabled(true);

    const row = new Discord.MessageActionRow().addComponents([button])
    const row2 = new Discord.MessageActionRow().addComponents([button2])

    const embedlog = logembed.fetch(`${message.guild.id}.embedlog`)

    client.channels.cache.get(embedlog).send({ content: `Salon: <#${message.channel.id}>`, embeds: [message.embeds[0].toJSON()], components: [row] })


    client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
            interaction.message.edit({ components: [row2] })
            interaction.reply({
                ephemeral: true, embeds: [{ description: `✅ J'ai bien renvoyer l'embed dans le salon.` }]
            })
            const channel = interaction.guild.channels.cache.get(interaction.customId)
            if (channel) channel.send({ embeds: [new Discord.MessageEmbed(db.get(interaction.customId))] })
        }
    })
})

global.player = new Player(client, config.app.discordPlayer);

//ANTI CRASH
process.on("unhandledRejection", (reason, p) => {
    if (reason.code == 10062) return; // Unknown interaction
    if (reason.code == 10008) return; // Unknown message
    if (reason.code ==  50013) return; // Missing permissions
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(type, promise, reason);
});
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("warn", e => {
    console.log(e.replace(regToken, "that was redacted"));
});
client.on("error", e => {
    console.log(e.replace(regToken, "that was redacted"));
});

client.snipes = new Map()
client.on('messageDelete', function (message, channel) {

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

process.on("multipleResolves", (type, promise, reason) => {
    if (reason.toLocaleString() === "Error: Cannot perform IP discovery - socket closed") return;
});