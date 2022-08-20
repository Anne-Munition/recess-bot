import { SlashCommandBuilder } from 'discord.js'
import moveToTeamChannels from '../actions/moveToTeamChannels'
import moveToGroupChannel from '../actions/moveToGroupChannel'

export const info: CmdInfo = {
  global: true,
}

export const data = new SlashCommandBuilder()
  .setName('move')
  .setDescription('Move student voice channels')
  .addStringOption((option) =>
    option
      .setName('location')
      .setDescription('Where to move students?')
      .setRequired(true)
      .setChoices({ name: 'Teams', value: 'teams' }, { name: 'Group', value: 'group' }),
  )

export const run: CmdRun = async (interaction): Promise<void> => {
  if (!interaction.guildId) return
  await interaction.deferReply({ ephemeral: true })
  const option = interaction.options.getString('location', true)
  if (option === 'teams') {
    try {
      await moveToTeamChannels(interaction.guildId)
    } catch (err) {
      await interaction.editReply('Error moving students to team channels.')
      return
    }
    await interaction.editReply('Done moving students to team channels.')
    return
  }
  if (option === 'group') {
    try {
      await moveToGroupChannel(interaction.guildId)
    } catch (err) {
      await interaction.editReply('Error moving students to group channel.')
      return
    }
    await interaction.editReply('Done moving students to group channel.')
    return
  }
}
