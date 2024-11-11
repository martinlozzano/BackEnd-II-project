import { RouterClass } from "./routerClass.js"
import { CartController } from "../controllers/carts.controller.js"

const {
    getCarts,
    getCartById,
    createCart,
    updateCart,
    updateQuantity,
    deleteCart,
    deleteProductFromCart,
    addProductToCart
} = new CartController()

export class CartRouter extends RouterClass {
    init(){
        this.get("/", ["PUBLIC"], getCarts)
        this.get("/:cid", ["PUBLIC"], getCartById)
        this.post("/", ["USER"], createCart)
        this.post("/:cid/product/:pid", ["USER"], addProductToCart)
        this.put("/:cid", ["USER"], updateCart)
        this.put("/:cid/product/:pid", ["USER"], updateQuantity)
        this.delete("/:cid", ["USER"], deleteCart)
        this.delete("/:cid/product/:pid", ["USER"], deleteProductFromCart)
    }
} 