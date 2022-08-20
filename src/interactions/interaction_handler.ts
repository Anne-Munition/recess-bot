import { Interaction } from 'discord.js'
import { commands } from '../collections'
import logger from '../logger'

export default async function (interaction: Interaction): Promise<void> {
  logger.debug(`received interaction: ${interaction.id}`)
  if (interaction.isChatInputCommand()) {
    const command = commands.get(interaction.commandName)
    if (command) {
      try {
        await command.cmd.run(interaction)
      } catch (err: any) {
        logger.error(err.stack || err.message || err)
        if (interaction.deferred) {
          await interaction.editReply('There was an error while executing this command.')
        } else {
          await interaction.reply({
            content: 'There was an error while executing this command.',
            ephemeral: true,
          })
        }
      }
    }
  } else if (interaction.isButton()) {
    if (!interaction.guildId) return
    if (!interaction.message.interaction) return
    const command = commands.get(interaction.message.interaction.commandName)
    if (!command) return
    await interaction.deferUpdate()
    const customId = interaction.customId
    const buttonFunction = command?.cmd.buttons?.[customId]
    if (!buttonFunction) return

    await interaction.editReply('Working...')
    try {
      await buttonFunction(interaction.guildId)
    } catch (err) {}
    await interaction.editReply('Done')
  }
}
