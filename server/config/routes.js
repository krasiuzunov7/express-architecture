const controllers = require('../controllers')
const auth = require('../config/auth')
const upload = require('../utilities/upload')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/users/register', controllers.users.register)
  app.post('/users/store', controllers.users.store)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)

  app.get('/authors', controllers.authors.index)
  app.get('/author/create', auth.isAuthenticated, controllers.authors.create)
  app.post('/author/store', [auth.isAuthenticated, upload.single('image')], controllers.authors.store)
  app.get('/author/:id/details', auth.isAuthenticated, controllers.authors.details)
  app.get('/author/:id/edit', [auth.isAuthenticated, auth.canEdit('Author')], controllers.authors.edit)
  app.post('/author/:id/update', [auth.isAuthenticated, auth.canEdit('Author'), upload.single('image')], controllers.authors.update)
  app.get('/author/:id/delete', [auth.isAuthenticated, auth.canEdit('Author')], controllers.authors.delete)
  app.delete('/author/:id/delete/image', [auth.isAuthenticated, auth.canEdit('Author')], controllers.authors.deleteImage)
  app.post('/authors/limit', auth.isAuthenticated, controllers.authors.limit)
  app.post('/authors/sort', controllers.authors.sort)

  app.get('/books', controllers.books.index)
  app.get('/book/create', auth.isAuthenticated, controllers.books.create)
  app.post('/book/store', [auth.isAuthenticated, upload.single('image')], controllers.books.store)
  app.get('/book/:id/details', auth.isAuthenticated, controllers.books.details)
  app.get('/book/:id/edit', [auth.isAuthenticated, auth.canEdit('Book')], controllers.books.edit)
  app.post('/book/:id/update', [auth.isAuthenticated, auth.canEdit('Book'), upload.single('image')], controllers.books.update)
  app.get('/book/:id/delete', [auth.isAuthenticated, auth.canEdit('Book')], controllers.books.delete)
  app.delete('/book/:id/delete/image', [auth.isAuthenticated, auth.canEdit('Book')], controllers.books.deleteImage)
  app.post('/books/limit', auth.isAuthenticated, controllers.books.limit)
  app.post('/books/sort', controllers.books.sort)

  app.get('/bookstores', controllers.bookstores.index)
  app.get('/bookstore/create', auth.isAuthenticated, controllers.bookstores.create)
  app.post('/bookstore/store', auth.isAuthenticated, controllers.bookstores.store)
  app.get('/bookstore/:id/details', auth.isAuthenticated, controllers.bookstores.details)
  app.get('/bookstore/:id/edit', [auth.isAuthenticated, auth.canEdit('BookStore')], controllers.bookstores.edit)
  app.post('/bookstore/:id/update', [auth.isAuthenticated, auth.canEdit('BookStore')], controllers.bookstores.update)
  app.get('/bookstore/:id/delete', [auth.isAuthenticated, auth.canEdit('BookStore')], controllers.bookstores.delete)
  app.get('/bookstore/:id/book/:bookId/delete', [auth.isAuthenticated, auth.canEdit('BookStore')], controllers.bookstores.deleteBook)
  app.post('/bookstores/limit', auth.isAuthenticated, controllers.bookstores.limit)
  app.post('/bookstores/sort', controllers.bookstores.sort)

  app.all('*', (req, res) => {
    res.render('404')
  })
}