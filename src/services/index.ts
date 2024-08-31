import { product } from './product/product'
import { user } from './users/users'
import { authentication } from './authentication/authentication'
import { messages } from './messages/messages'
import { message } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(product)
  app.configure(user)
  app.configure(authentication)
  app.configure(messages)
  app.configure(message)
  // All services will be registered here
}
