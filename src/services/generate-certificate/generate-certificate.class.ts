// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type {
  GenerateCertificate,
  GenerateCertificateData,
  GenerateCertificatePatch,
  GenerateCertificateQuery
} from './generate-certificate.schema'

export type {
  GenerateCertificate,
  GenerateCertificateData,
  GenerateCertificatePatch,
  GenerateCertificateQuery
}

export interface GenerateCertificateServiceOptions {
  app: Application
}

export interface GenerateCertificateParams extends Params<GenerateCertificateQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class GenerateCertificateService<
  ServiceParams extends GenerateCertificateParams = GenerateCertificateParams
> implements
    ServiceInterface<GenerateCertificate, GenerateCertificateData, ServiceParams, GenerateCertificatePatch>
{
  constructor(public options: GenerateCertificateServiceOptions) {}

  async find(_params?: ServiceParams): Promise<GenerateCertificate[]> {
    return []
  }

  async get(id: Id, _params?: ServiceParams): Promise<GenerateCertificate> {
    return {
      id: 0,
      certificateId: '',
      templateId: '',
      recipientName: '',
      recipientEmail: '',
      courseName: '',
      companyName: '',
      sendMail: true
      // Optionally include date if needed, e.g.:
      // date: new Date().toISOString()
    }
  }

  async create(data: GenerateCertificateData, params?: ServiceParams): Promise<GenerateCertificate>
  async create(data: GenerateCertificateData[], params?: ServiceParams): Promise<GenerateCertificate[]>
  async create(
    data: GenerateCertificateData | GenerateCertificateData[],
    params?: ServiceParams
  ): Promise<GenerateCertificate | GenerateCertificate[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(
    id: NullableId,
    data: GenerateCertificateData,
    _params?: ServiceParams
  ): Promise<GenerateCertificate> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(
    id: NullableId,
    data: GenerateCertificatePatch,
    _params?: ServiceParams
  ): Promise<GenerateCertificate> {
    return {
      id: 0,
      certificateId: '',
      templateId: '',
      recipientName: '',
      recipientEmail: '',
      courseName: '',
      companyName: '',
      sendMail: true
      // Optionally include date if needed, e.g.:
      // date: new Date().toISOString()
    }
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<GenerateCertificate> {
    return {
      id: 0,
      certificateId: '',
      templateId: '',
      recipientName: '',
      recipientEmail: '',
      courseName: '',
      companyName: '',
      sendMail: true
      // Optionally include date if needed, e.g.:
      // date: new Date().toISOString()
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
