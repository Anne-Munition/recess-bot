import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js'
import moveToTeamChannels from '../actions/moveToTeamChannels'
import moveToGroupChannel from '../actions/moveToGroupChannel'

export const info: CmdInfo = {
  global: true,
}

export const data = new SlashCommandBuilder()
  .setName('voice_actions')
  .setDescription('Create buttons to move team voice members.')

export const run: CmdRun = async (interaction): Promise<void> => {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('teamVoice')
      .setLabel('TEAM VOICE')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('groupVoice')
      .setLabel('GROUP VOICE')
      .setStyle(ButtonStyle.Secondary),
  )

  await interaction.reply({ components: [row] })
}

export const buttons: CmdBtns = {
  teamVoice: (guildId: string) => moveToTeamChannels(guildId),
  groupVoice: (guildId: string) => moveToGroupChannel(guildId),
}
