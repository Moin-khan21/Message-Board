// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  authenticationDataValidator,
  authenticationPatchValidator,
  authenticationQueryValidator,
  authenticationResolver,
  authenticationExternalResolver,
  authenticationDataResolver,
  authenticationPatchResolver,
  authenticationQueryResolver
} from './authentication.schema'

import type { Application } from '../../declarations'
import { AuthenticationService, getOptions } from './authentication.class'
import { authenticationPath, authenticationMethods } from './authentication.shared'

export * from './authentication.class'
export * from './authentication.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const authentication = (app: Application) => {
  // Register our service on the Feathers application
  app.use(authenticationPath, new AuthenticationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: authenticationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(authenticationPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(authenticationExternalResolver),
        schemaHooks.resolveResult(authenticationResolver)
      ],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(authenticationQueryValidator),
        schemaHooks.resolveQuery(authenticationQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(authenticationDataValidator),
        schemaHooks.resolveData(authenticationDataResolver)
      ],
      patch: [
        schemaHooks.validateData(authenticationPatchValidator),
        schemaHooks.resolveData(authenticationPatchResolver)
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
    [authenticationPath]: AuthenticationService
  }
}
