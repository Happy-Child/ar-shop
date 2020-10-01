import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(
    '/api/re-confirmation-email/:email',
    'UserController.reConfirmationEmail'
  ).as('reConfirmationEmail')

  Route.get(
    '/api/verify-email',
    'UserController.verifyEmail'
  ).as('verifyEmail')

  Route.post(
    '/api/login',
    'UserController.login'
  ).as('login')

  Route.post(
    '/api/registration',
    'UserController.registration'
  ).as('registration')

  Route.get(
    '/api/reset-password/:email',
    'UserController.resetPassword'
  ).as('resetPassword')

  Route.post(
    '/api/create-new-password',
    'UserController.createNewPassword'
  ).as('createNewPassword')
})
  .middleware('guest')


Route.group(() => {
  Route.get(
    '/api/auth-by-token',
    'UserController.authByToken'
  ).as('authByToken')

  Route.get(
    '/api/logout',
    'UserController.logout'
  ).as('logout')

  Route.put(
    '/api/user/update',
    'UserController.update'
  ).as('userUpdate')
})
  .middleware('auth')


