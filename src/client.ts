// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { sendMailClient } from './services/send-mail/send-mail.shared'
export type {
  SendMail,
  SendMailData,
  SendMailQuery,
  SendMailPatch
} from './services/send-mail/send-mail.shared'

import { generateCertificateClient } from './services/generate-certificate/generate-certificate.shared'
export type {
  GenerateCertificate,
  GenerateCertificateData,
  GenerateCertificateQuery,
  GenerateCertificatePatch
} from './services/generate-certificate/generate-certificate.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the certificate-platform-backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(generateCertificateClient)
  client.configure(sendMailClient)
  return client
}
