const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const config = require('../config')


module.exports = {
    name: 'guildDelete',
    once: false,

    async execute(client, guild) {

        client.users.cache.get(config.app.owners).send(`Je viens de quitté **${guild.name}** (__${guild.memberCount} membres__) | Limite de serveurs ${client.guilds.cache.size - 1}/${config.app.maxserver}`).catch(() => false)
    }
}