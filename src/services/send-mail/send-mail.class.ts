// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { SendMail, SendMailData, SendMailPatch, SendMailQuery } from './send-mail.schema'

export type { SendMail, SendMailData, SendMailPatch, SendMailQuery }

export interface SendMailServiceOptions {
  app: Application
}

export interface SendMailParams extends Params<SendMailQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SendMailService<ServiceParams extends SendMailParams = SendMailParams>
  implements ServiceInterface<SendMail, SendMailData, ServiceParams, SendMailPatch>
{
  constructor(public options: SendMailServiceOptions) {}

  async find(_params?: ServiceParams): Promise<SendMail[]> {
    return []
  }

  async get(id: Id, _params?: ServiceParams): Promise<SendMail> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data: SendMailData, params?: ServiceParams): Promise<SendMail>
  async create(data: SendMailData[], params?: ServiceParams): Promise<SendMail[]>
  async create(data: SendMailData | SendMailData[], params?: ServiceParams): Promise<SendMail | SendMail[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: SendMailData, _params?: ServiceParams): Promise<SendMail> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id: NullableId, data: SendMailPatch, _params?: ServiceParams): Promise<SendMail> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<SendMail> {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
