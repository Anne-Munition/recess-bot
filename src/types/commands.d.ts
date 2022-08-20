type Commands = import('discord.js').Collection<
  string,
  {
    cmd: Cmd
    id?: import('discord.js').Snowflake
  }
>

type GlobalCmdInfo = {
  global: true
}

type GuildCmdInfo = {
  global: false
  guilds: import('discord.js').Snowflake[]
}

type CmdInfo = GlobalCmdInfo | GuildCmdInfo

type CmdRun = (interaction: import('discord.js').ChatInputCommandInteraction) => Promise<void>

type CmdStructure = import('discord.js').SlashCommandBuilder

interface Cmd {
  info: CmdInfo
  data: CmdStructure
  run: CmdRun
  buttons?: CmdBtns
}

interface CmdBtns {
  [key: string]: (guildId: string) => Promise<void>
}
