import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


  Route.group(() => {
    Route.group(() => {
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

    Route.group(() => {
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


      Route.group(() => {
        Route.get(
          '/',
          'Users/UsersMembersController.getUsers'
        ).as('getUsers')

        Route.get(
          '/:id',
          'Users/UsersMembersController.getUser'
        ).as('getUser')


        Route.group(() => {
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


  Route.group(() => {
    Route.get(
      '/',
      'Products/ProductsController.list'
    ).as('listProducts')

    Route.get(
      '/:id',
      'Products/ProductsController.show'
    ).as('getProduct')

    Route.group(() => {
      Route.post(
        '/',
        'Products/ProductsController.create'
      ).as('createProduct')

      Route.put(
        '/:id',
        'Products/ProductsController.update'
      ).as('updateProduct')

      Route.delete(
        '/:id',
        'Products/ProductsController.delete'
      ).as('deleteProduct')
    }).middleware(['auth', 'member'])
  }).prefix('/products')


  Route.group(() => {
    Route.get(
      '/all',
      'Categories/CategoriesController.getAll'
    ).as('getAllCategories')

    Route.get(
      '/',
      'Categories/CategoriesController.list'
    ).as('listCategories')

    Route.get(
      '/:id',
      'Categories/CategoriesController.show'
    ).as('getCategory')

    Route.group(() => {
      Route.post(
        '/',
        'Categories/CategoriesController.create'
      ).as('createCategory')

      Route.put(
        '/:id',
        'Categories/CategoriesController.update'
      ).as('updateCategory')

      Route.delete(
        '/:id',
        'Categories/CategoriesController.delete'
      ).as('deleteCategory')
    }).middleware(['auth', 'member'])

  }).prefix('/categories')


  Route.group(() => {
    Route.get(
      '/get-my-orders',
      'Orders/OrdersController.getMyOrders'
    ).as('getMyOrders')

    Route.post(
      '/',
      'Orders/OrdersController.create'
    ).as('createOrder')

    Route.group(() => {
      Route.get(
        '/',
        'Orders/OrdersController.list'
      ).as('listOrders')

      Route.get(
        '/:id',
        'Orders/OrdersController.show'
      ).as('getOrder')

      Route.put(
        '/:id',
        'Orders/OrdersController.update'
      ).as('updateOrder')

      Route.delete(
        '/:id',
        'Orders/OrdersController.delete'
      ).as('deleteOrder')
    }).middleware(['auth', 'member'])

  }).middleware('auth').prefix('/orders')


}).prefix('/api')
