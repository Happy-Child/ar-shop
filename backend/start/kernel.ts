import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  'Adonis/Core/BodyParserMiddleware',
])

Server.middleware.registerNamed({
  auth: 'App/Middleware/Auth',
  guest: 'App/Middleware/Guest',
  member: 'App/Middleware/Member',
  admin: 'App/Middleware/Admin',
})
