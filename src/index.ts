import * as app from './app'
import logger from './logger'

logger.info('Starting the application...')

app
  .start()
  .then(() => {
    logger.info('Startup complete.')
  })
  .catch((err) => {
    logger.error(err.message)
    process.exit(1)
  })

const signals: NodeJS.Signals[] = ['SIGHUP', 'SIGINT', 'SIGTERM']

signals.forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal)
  })
})

const shutdown = (signal: NodeJS.Signals) => {
  logger.info(`Received a ${signal} signal. Attempting graceful shutdown...`)
  app.stop().finally(() => {
    logger.info(`Shutdown completed. Exiting.`)
    process.exit(0)
  })
}

if (process.env.NODE_ENV === 'production') {
  // Message the bot owner on any unhandled errors
  process.on('unhandledRejection', (err: Error) => {
    logger.error(err)
  })

  // Message the bot owner on any uncaught errors
  process.on('uncaughtException', (err: Error) => {
    logger.error(err)
  })
}
