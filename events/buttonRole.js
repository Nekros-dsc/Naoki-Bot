
const config = require('../config')
const db = require('quick.db')
const cl = new db.table("Color")

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction, message) {

        let color = cl.fetch(`color_${interaction.guild.id}`)
        if (color == null) color = config.app.color

        if (!interaction.isButton()) return;
	
        const donnée = await db.get(`buttonrole_${interaction.message.id}`)
        if (!donnée) return

        const role = interaction.guild.roles.cache.get(donnée)
        if (!role) return

        if (!interaction.member.roles.cache.has(role.id)) {
            interaction.reply({ content: `${interaction.user}, je vous ai donné le rôle \`${role.name}\``, ephemeral: true })
            interaction.member.roles.add(role).catch(() => false)
        }
        else {
            interaction.reply({ content: `${interaction.user}, je vous ai enlevé le rôle \`${role.name}\``, ephemeral: true })
            interaction.member.roles.remove(role).catch(() => false)
        }
    }
}