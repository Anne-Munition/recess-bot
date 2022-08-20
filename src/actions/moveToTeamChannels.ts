import * as config from '../config'
import client from '../discord'
import logger from '../logger'

export default async (guildId: string): Promise<void> => {
  const guild = client.guilds.cache.get(guildId)
  if (!guild) throw new Error('Missing guild id')

  const roles = guild.roles
  const studentRole = roles.cache.get(config.studentRole)
  if (!studentRole) throw new Error('Unable to find student role')

  const students = studentRole.members.filter((x) => x.voice.channelId === config.mainVoice)
  logger.debug(students.size)

  students.forEach((student) => {
    const roles = student.roles.cache
    for (const team in config.map) {
      if (roles.has(config.map[team].role)) {
        logger.debug(`Team: ${team}`)
        student.voice.setChannel(config.map[team].voice)
      }
    }
  })
}
