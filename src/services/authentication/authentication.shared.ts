// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Authentication,
  AuthenticationData,
  AuthenticationPatch,
  AuthenticationQuery,
  AuthenticationService
} from './authentication.class'

export type { Authentication, AuthenticationData, AuthenticationPatch, AuthenticationQuery }

export type AuthenticationClientService = Pick<
  AuthenticationService<Params<AuthenticationQuery>>,
  (typeof authenticationMethods)[number]
>

export const authenticationPath = '/authentication'

export const authenticationMethods: Array<keyof AuthenticationService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const authenticationClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(authenticationPath, connection.service(authenticationPath), {
    methods: authenticationMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [authenticationPath]: AuthenticationClientService
  }
}
