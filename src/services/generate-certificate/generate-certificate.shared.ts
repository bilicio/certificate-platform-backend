// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  GenerateCertificate,
  GenerateCertificateData,
  GenerateCertificatePatch,
  GenerateCertificateQuery,
  GenerateCertificateService
} from './generate-certificate.class'

export type {
  GenerateCertificate,
  GenerateCertificateData,
  GenerateCertificatePatch,
  GenerateCertificateQuery
}

export type GenerateCertificateClientService = Pick<
  GenerateCertificateService<Params<GenerateCertificateQuery>>,
  (typeof generateCertificateMethods)[number]
>

export const generateCertificatePath = 'generate-certificate'

export const generateCertificateMethods: Array<keyof GenerateCertificateService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const generateCertificateClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(generateCertificatePath, connection.service(generateCertificatePath), {
    methods: generateCertificateMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [generateCertificatePath]: GenerateCertificateClientService
  }
}
