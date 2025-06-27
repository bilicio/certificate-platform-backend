import { sendMail } from './send-mail/send-mail'
import { generateCertificate } from './generate-certificate/generate-certificate'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(sendMail)
  app.configure(generateCertificate)
  // All services will be registered here
}
