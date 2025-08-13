// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { GenerateCertificateService } from './generate-certificate.class'

// Main data model schema
export const generateCertificateSchema = {
  $id: 'GenerateCertificate',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'certificateId', 'templateId', 'recipientName', 'courseName','companyName', 'recipientEmail', 'sendMail'],
  properties: {
    id: { type: 'number' },
    certificateId: { type: 'string' },
    templateId: { type: 'string' },
    recipientName: { type: 'string' },
    recipientEmail: { type: 'string' },
    courseName: { type: 'string' },
    date: { type: 'string'},
    companyName: { type: 'string' },
    sendMail: { type: 'boolean' }
  }
} as const
export type GenerateCertificate = FromSchema<typeof generateCertificateSchema>
export const generateCertificateValidator = getValidator(generateCertificateSchema, dataValidator)
export const generateCertificateResolver = resolve<
  GenerateCertificate,
  HookContext<GenerateCertificateService>
>({})

export const generateCertificateExternalResolver = resolve<
  GenerateCertificate,
  HookContext<GenerateCertificateService>
>({})

// Schema for creating new data
export const generateCertificateDataSchema = {
  $id: 'GenerateCertificateData',
  type: 'object',
  additionalProperties: false,
  required: ['certificateId', 'templateId', 'recipientName', 'courseName', 'date', 'companyName', 'recipientEmail', 'sendMail'],
  properties: {
    ...generateCertificateSchema.properties
  }
} as const
export type GenerateCertificateData = FromSchema<typeof generateCertificateDataSchema>
export const generateCertificateDataValidator = getValidator(generateCertificateDataSchema, dataValidator)
export const generateCertificateDataResolver = resolve<
  GenerateCertificateData,
  HookContext<GenerateCertificateService>
>({})

// Schema for updating existing data
export const generateCertificatePatchSchema = {
  $id: 'GenerateCertificatePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...generateCertificateSchema.properties
  }
} as const
export type GenerateCertificatePatch = FromSchema<typeof generateCertificatePatchSchema>
export const generateCertificatePatchValidator = getValidator(generateCertificatePatchSchema, dataValidator)
export const generateCertificatePatchResolver = resolve<
  GenerateCertificatePatch,
  HookContext<GenerateCertificateService>
>({})

// Schema for allowed query properties
export const generateCertificateQuerySchema = {
  $id: 'GenerateCertificateQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(generateCertificateSchema.properties)
  }
} as const
export type GenerateCertificateQuery = FromSchema<typeof generateCertificateQuerySchema>
export const generateCertificateQueryValidator = getValidator(generateCertificateQuerySchema, queryValidator)
export const generateCertificateQueryResolver = resolve<
  GenerateCertificateQuery,
  HookContext<GenerateCertificateService>
>({})
