import { Client, GatewayIntentBits } from 'discord.js'
import logger from './logger'
import interactionHandler from './interactions/interaction_handler'
import interactionLoader from './interactions/interaction_loader'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

client.on('interactionCreate', interactionHandler)

export async function connect(): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.info('Connecting to Discord...')
    client.login(process.env.BOT_TOKEN)
    const timer = setTimeout(() => {
      reject(new Error('Took longer than 60 seconds to connect to Discord.'))
    }, 1000 * 60)
    client.once('ready', async () => {
      clearTimeout(timer)
      logger.info(`Connected to Discord as '${client?.user?.tag}'`)
      for (const guild of client.guilds.cache) {
        await guild[1].members.fetch()
        await guild[1].channels.fetch()
      }
      await interactionLoader(client)
      resolve()
    })
  })
}

export function disconnect(): void {
  client.destroy()
  logger.info('Closed the Discord connection.')
}

export default client
