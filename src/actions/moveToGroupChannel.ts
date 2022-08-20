import * as config from '../config'
import client from '../discord'
import logger from '../logger'

export default async (guildId: string): Promise<void> => {
  const guild = client.guilds.cache.get(guildId)
  if (!guild) throw new Error('Missing guild id')

  const studentRole = guild.roles.cache.get(config.studentRole)
  if (!studentRole) throw new Error('Cannot get student role')

  const students = studentRole.members.filter(
    (x) => Boolean(x.voice.channelId) && x.voice.channelId !== config.mainVoice,
  )
  logger.debug(students.size)

  students.forEach((student) => {
    student.voice.setChannel(config.mainVoice)
  })
}
