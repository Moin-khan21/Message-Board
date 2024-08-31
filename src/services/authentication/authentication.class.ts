// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  Authentication,
  AuthenticationData,
  AuthenticationPatch,
  AuthenticationQuery
} from './authentication.schema'

export type { Authentication, AuthenticationData, AuthenticationPatch, AuthenticationQuery }

export interface AuthenticationParams extends KnexAdapterParams<AuthenticationQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class AuthenticationService<ServiceParams extends Params = AuthenticationParams> extends KnexService<
  Authentication,
  AuthenticationData,
  AuthenticationParams,
  AuthenticationPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'authentication'
  }
}
