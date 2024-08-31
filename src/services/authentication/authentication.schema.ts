// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AuthenticationService } from './authentication.class'

// Main data model schema
export const authenticationSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.Optional(Type.String())
  },
  { $id: 'Authentication', additionalProperties: false }
)
export type Authentication = Static<typeof authenticationSchema>
export const authenticationValidator = getValidator(authenticationSchema, dataValidator)
export const authenticationResolver = resolve<Authentication, HookContext<AuthenticationService>>({})

export const authenticationExternalResolver = resolve<Authentication, HookContext<AuthenticationService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const authenticationDataSchema = Type.Pick(authenticationSchema, ['email', 'password'], {
  $id: 'AuthenticationData'
})
export type AuthenticationData = Static<typeof authenticationDataSchema>
export const authenticationDataValidator = getValidator(authenticationDataSchema, dataValidator)
export const authenticationDataResolver = resolve<Authentication, HookContext<AuthenticationService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const authenticationPatchSchema = Type.Partial(authenticationSchema, {
  $id: 'AuthenticationPatch'
})
export type AuthenticationPatch = Static<typeof authenticationPatchSchema>
export const authenticationPatchValidator = getValidator(authenticationPatchSchema, dataValidator)
export const authenticationPatchResolver = resolve<Authentication, HookContext<AuthenticationService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const authenticationQueryProperties = Type.Pick(authenticationSchema, ['id', 'email'])
export const authenticationQuerySchema = Type.Intersect(
  [
    querySyntax(authenticationQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AuthenticationQuery = Static<typeof authenticationQuerySchema>
export const authenticationQueryValidator = getValidator(authenticationQuerySchema, queryValidator)
export const authenticationQueryResolver = resolve<AuthenticationQuery, HookContext<AuthenticationService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
})
