import { UsersDaoMongo } from "../dao/UsersDao.MongoDB.js"
import { CartsDaoMongo } from "../dao/CartsDao.MongoDB.js"
import { ProductsDaoMongo } from "../dao/ProductsDao.MongoDB.js"
import { UserRepository } from "../repositories/users.repository.js"
import { ProductsRepository } from "../repositories/products.repository.js"
import { CartsRepository } from "../repositories/carts.repository.js"

export const userService = new UserRepository(new UsersDaoMongo())
export const cartService = new CartsRepository(new CartsDaoMongo())
export const productService = new ProductsRepository(new ProductsDaoMongo())

