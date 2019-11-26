const Route = use('Route')

// rotas publicas
Route.post('/company', 'CompanyController.store')
Route.post('/user', 'UserController.store')
Route.post('/sessions', 'SessionController.create')

Route.get('/novos', 'SessionController.novos')
Route.get('/novas', 'SessionController.novas')
Route.post('/usuario', 'SessionController.usuario')
Route.post('/eva', 'SessionController.imc')

Route
  .group(() => {
    Route.resource('evaluation', 'EvaluationController').apiOnly()
    Route.resource('company', 'CompanyController').apiOnly()
    Route.resource('user', 'UserController').apiOnly()
    Route.resource('weight', 'WeightController').apiOnly()
  }).prefix('auth').middleware(['auth'])

    // }).prefix('auth').middleware(['auth'])

Route
  .group(() => {
    Route.post('/evaluation/:id/images', 'ImageEvaluationController.store')
    Route.get('/image/:path', 'ImageEvaluationController.show')
    Route.post('/user/:id/images', 'ImageUserController.store')
    Route.get('/image/:path', 'ImageUserController.show')

    Route.post('/company/:id/images', 'ImageCompanyController.store')
    Route.get('/image/:path', 'ImageCompanyController.show')
  })

  // rota public
Route.get('/*', () => {
    return `
    <html>
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <section>
          <div class="logo"></div>
          <div class="title"></div>
          <div class="subtitle"><p>
          Page with restrictions, I'll see you on the dashboard if you're an admin,
          see ya.
          </p></div>
        </section>
      </body>
    </html>
    `
  })
