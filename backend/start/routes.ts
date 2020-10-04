import Route from '@ioc:Adonis/Core/Route'

Route.group(() => { // API


  Route.group(() => { // /users

    Route.group(() => { // Guests
      Route.post(
        '/login',
        'Users/UsersGuestsController.login'
      ).as('login')

      Route.post(
        '/registration',
        'Users/UsersGuestsController.registration'
      ).as('registration')

      Route.get(
        '/verify-email',
        'Users/UsersGuestsController.verifyEmail'
      ).as('verifyEmail')

      Route.get(
        '/re-confirmation-email/:email',
        'Users/UsersGuestsController.reConfirmationEmail'
      ).as('reConfirmationEmail')

      Route.get(
        '/reset-password/:email',
        'Users/UsersGuestsController.resetPassword'
      ).as('resetPassword')

      Route.post(
        '/create-new-password',
        'Users/UsersGuestsController.createNewPassword'
      ).as('createNewPassword')
    }).middleware('guest')


    Route.group(() => { // Authorized
      Route.get(
        '/auth-by-token',
        'Users/UsersAuthorizedController.authByToken'
      ).as('authByToken')

      Route.get(
        '/logout',
        'Users/UsersAuthorizedController.logout'
      ).as('logout')

      Route.put(
        '/update',
        'Users/UsersAuthorizedController.updateAuthUser'
      ).as('updateAuthUser')


      Route.group(() => { // Members
        Route.get(
          '/',
          'Users/UsersMembersController.getUsers'
        ).as('getUsers')

        Route.get(
          '/:id',
          'Users/UsersMembersController.getUser'
        ).as('getUser')


        Route.group(() => { // Admins
          Route.post(
            '/',
            'Users/UsersAdminsController.userCreate'
          ).as('userCreate')

          Route.put(
            '/:id',
            'Users/UsersAdminsController.userUpdate'
          ).as('userUpdate')

          Route.delete(
            '/:id',
            'Users/UsersAdminsController.userDelete'
          ).as('userDelete')
        }).middleware('admin')


      }).middleware('member')


    }).middleware('auth')

  }).prefix('/users')


  Route.group(() => { // /products
    Route.get(
      '/',
      'Products/ProductsController.getProducts'
    ).as('getProducts')

    Route.get(
      '/:id',
      'Products/ProductsController.getProduct'
    ).as('getProduct')


    Route.group(() => { // Members
      Route.post(
        '/',
        'Products/ProductsController.createProduct'
      ).as('createProduct')

      Route.put(
        '/',
        'Products/ProductsController.updateProduct'
      ).as('updateProduct')

      Route.delete(
        '/',
        'Products/ProductsController.deleteProduct'
      ).as('deleteProduct')
    }).middleware('member')

  }).prefix('/products')


}).prefix('/api')
