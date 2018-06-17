import * as Rollbar from 'rollbar'

let instance

function rollbar () {
  if (instance) {
    return instance
  }

  instance = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV
    }
  })

  return instance
}

export default rollbar
