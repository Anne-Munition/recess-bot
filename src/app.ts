import * as discord from './discord'
import commandLoader from './command_loader'

export async function start(): Promise<void> {
  await commandLoader()
  await discord.connect()
}

export async function stop(): Promise<void> {
  await discord.disconnect()
}
