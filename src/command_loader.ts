import fs from 'fs'
import path from 'path'
import { commands } from './collections'
import { cmdsDir } from './directories'
import log from './logger'

const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts'

async function loadAllCommands(): Promise<void> {
  log.debug('loading all commands into memory')
  const files = fs
    .readdirSync(cmdsDir)
    .filter((file) => file.endsWith(`.${ext}`))
    .map((file) => path.parse(file).name)
  log.debug(`loading ${files.length} command(s).`)
  await Promise.all(files.map((file) => loadCommand(file)))
  log.info(`Loaded ${commands.size} slash command(s).`)
}

async function loadCommand(name: string): Promise<void> {
  const cmdPath = path.join(cmdsDir, `${name}.${ext}`)
  if (commands.has(name)) removeSlashCommand(name)
  log.debug(`loading command: '${name}'`)
  let cmd: Cmd
  try {
    cmd = await import(cmdPath)
  } catch (e) {
    log.warn(`The '${name}' command was unable to be imported.`)
    return
  }
  if (!cmd.info || !cmd.data || !cmd.run) {
    log.warn(`The '${name}' command has missing elements.`)
    return
  }

  commands.set(name, { cmd })
}

function removeSlashCommand(name: string) {
  log.debug(`flushing command: '${name}'`)
  delete require.cache[require.resolve(path.join(cmdsDir, `${name}.${ext}`))]
  commands.delete(name)
}

export default loadAllCommands
