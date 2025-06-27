// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  generateCertificateDataValidator,
  generateCertificatePatchValidator,
  generateCertificateQueryValidator,
  generateCertificateResolver,
  generateCertificateExternalResolver,
  generateCertificateDataResolver,
  generateCertificatePatchResolver,
  generateCertificateQueryResolver
} from './generate-certificate.schema'

import type { Application } from '../../declarations'
import { GenerateCertificateService, getOptions } from './generate-certificate.class'
import { generateCertificatePath, generateCertificateMethods } from './generate-certificate.shared'
import { generateImage } from '../../hooks/generate-image'
import { generateQrcode } from '../../hooks/generate-qrcode'
import { uploadStorage } from '../../hooks/upload-storage'
import { mailImersionCertificate } from '../../hooks/mail-imersion-certificate'
import { testHook } from '../../hooks/test-hook'

export * from './generate-certificate.class'
export * from './generate-certificate.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const generateCertificate = (app: Application) => {
  // Register our service on the Feathers application
  app.use(generateCertificatePath, new GenerateCertificateService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: generateCertificateMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(generateCertificatePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(generateCertificateExternalResolver),
        schemaHooks.resolveResult(generateCertificateResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(generateCertificateQueryValidator),
        schemaHooks.resolveQuery(generateCertificateQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(generateCertificateDataValidator),
        schemaHooks.resolveData(generateCertificateDataResolver),
        //insertCertificateDatabase,
        generateImage,
        generateQrcode,
        uploadStorage
        
      ],
      patch: [
        schemaHooks.validateData(generateCertificatePatchValidator),
        schemaHooks.resolveData(generateCertificatePatchResolver)
      ],
      remove: []
    },
    after: {
      all: [mailImersionCertificate]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [generateCertificatePath]: GenerateCertificateService
  }
}
