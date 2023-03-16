const Discord = require('discord.js')
const db = require("quick.db")
const config = require('../config')


module.exports = {
    name: 'guildCreate',
    once: false,

    async execute(client, guild) {

        client.users.cache.get(config.app.owners).send(`Je viens de rejoindre **${guild.name}** (__${guild.memberCount} membres__) | Limite de serveurs ${client.guilds.cache.size - 1}/${config.app.maxserver - 1}`).catch(()=> false) 
        if (client.guilds.cache.size > config.app.maxserver) return guild.leave() & client.users.cache.get(config.app.owners).send(`**Vous avez atteint la limite de serveurs sur votre bot (${config.app.maxserver - 1} serveurs)**`).catch(()=> false) 
    }
}