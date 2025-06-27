// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { SendMail, SendMailData, SendMailPatch, SendMailQuery, SendMailService } from './send-mail.class'

export type { SendMail, SendMailData, SendMailPatch, SendMailQuery }

export type SendMailClientService = Pick<
  SendMailService<Params<SendMailQuery>>,
  (typeof sendMailMethods)[number]
>

export const sendMailPath = 'send-mail'

export const sendMailMethods: Array<keyof SendMailService> = ['find', 'get', 'create', 'patch', 'remove']

export const sendMailClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(sendMailPath, connection.service(sendMailPath), {
    methods: sendMailMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [sendMailPath]: SendMailClientService
  }
}
