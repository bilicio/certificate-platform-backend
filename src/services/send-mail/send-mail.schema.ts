// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { SendMailService } from './send-mail.class'

// Main data model schema
export const sendMailSchema = {
  $id: 'SendMail',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },

    text: { type: 'string' }
  }
} as const
export type SendMail = FromSchema<typeof sendMailSchema>
export const sendMailValidator = getValidator(sendMailSchema, dataValidator)
export const sendMailResolver = resolve<SendMail, HookContext<SendMailService>>({})

export const sendMailExternalResolver = resolve<SendMail, HookContext<SendMailService>>({})

// Schema for creating new data
export const sendMailDataSchema = {
  $id: 'SendMailData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...sendMailSchema.properties
  }
} as const
export type SendMailData = FromSchema<typeof sendMailDataSchema>
export const sendMailDataValidator = getValidator(sendMailDataSchema, dataValidator)
export const sendMailDataResolver = resolve<SendMailData, HookContext<SendMailService>>({})

// Schema for updating existing data
export const sendMailPatchSchema = {
  $id: 'SendMailPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...sendMailSchema.properties
  }
} as const
export type SendMailPatch = FromSchema<typeof sendMailPatchSchema>
export const sendMailPatchValidator = getValidator(sendMailPatchSchema, dataValidator)
export const sendMailPatchResolver = resolve<SendMailPatch, HookContext<SendMailService>>({})

// Schema for allowed query properties
export const sendMailQuerySchema = {
  $id: 'SendMailQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(sendMailSchema.properties)
  }
} as const
export type SendMailQuery = FromSchema<typeof sendMailQuerySchema>
export const sendMailQueryValidator = getValidator(sendMailQuerySchema, queryValidator)
export const sendMailQueryResolver = resolve<SendMailQuery, HookContext<SendMailService>>({})
