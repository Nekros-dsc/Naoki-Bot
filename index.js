const { Client, Intents, Collection } = require('discord.js');
const config = require('./config')
const { Player } = require('discord-player');
ms = require("ms")
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    restTimeOffset: 0,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});
const { readdirSync } = require('fs');
client.config = ('./config.js')
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
global.player = new Player(client, config.app.discordPlayer);
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
process.on("unhandledRejection", err => {console.log(err);})

client.login(config.app.token);