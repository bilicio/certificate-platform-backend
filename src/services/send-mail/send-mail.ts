// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  sendMailDataValidator,
  sendMailPatchValidator,
  sendMailQueryValidator,
  sendMailResolver,
  sendMailExternalResolver,
  sendMailDataResolver,
  sendMailPatchResolver,
  sendMailQueryResolver
} from './send-mail.schema'

import type { Application } from '../../declarations'
import { SendMailService, getOptions } from './send-mail.class'
import { sendMailPath, sendMailMethods } from './send-mail.shared'
import { mailImersionCertificate } from '../../hooks/mail-imersion-certificate'

export * from './send-mail.class'
export * from './send-mail.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const sendMail = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sendMailPath, new SendMailService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sendMailMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sendMailPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(sendMailExternalResolver),
        schemaHooks.resolveResult(sendMailResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(sendMailQueryValidator),
        schemaHooks.resolveQuery(sendMailQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(sendMailDataValidator),
        schemaHooks.resolveData(sendMailDataResolver),
        mailImersionCertificate
      ],
      patch: [
        schemaHooks.validateData(sendMailPatchValidator),
        schemaHooks.resolveData(sendMailPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [sendMailPath]: SendMailService
  }
}
