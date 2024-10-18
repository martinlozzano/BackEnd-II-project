import { Router } from "express"
import { UsersManager } from "../dao/UsersManager.MongoDB.js"

export const router = Router()

const midd1 = (req, res, next) => {
    console.log("middleware")
    next()
}

router.get("/", midd1, async(req, res) => {
    try {
        const users = await UsersManager.getAllUsers()
        res.status(200).json({users})
        
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({
            error: `Error inesperado en el servidor.`,
            detalle: `${error.message}` 
        })
    }
})

router.get("/:uid", async(req, res) => {
    const { uid } = req.params

    try {
        const user = await UsersManager.getUser({_id: uid})
        res.status(200).send({status: "success", data: user})
        
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({
            error: `Error inesperado en el servidor.`,
            detalle: `${error.message}` 
        })
    }
})

router.post("/", async(req, res) => {
    const { first_name, last_name, email, age, password, cart, role} = req.body

    if(!email){
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({error: `Es necesario que el campo email sea colocado y que sea un string.`})
    }

    try {
        const user = await UsersManager.createUser({first_name, last_name, email, age, password, cart, role})

        res.status(200).send({status: "success", data: user})
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({
            error: `Error inesperado en el servidor.`,
            detalle: `${error.message}` 
        })
    }
})

router.put("/:uid", async(req, res) => {
    const { uid } = req.params
    const { first_name, last_name, email, age, password, role } = req.body

    const userToUpdate = {
        first_name,
        last_name,
        email,
        age,
        password,
        role
    }

    try {
        const result = await UsersManager.updateUser({_id: uid}, userToUpdate)
        res.status(200).send({status: "success", data: result})
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({
            error: `Error inesperado en el servidor.`,
            detalle: `${error.message}` 
        })
    }
})

router.delete("/:uid", async(req, res) => {
    const { uid } = req.params
    try {
        const result = await UsersManager.deleteUser(uid)
        res.status(200).send({status: "success", data: result})
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json({
            error: `Error inesperado en el servidor.`,
            detalle: `${error.message}` 
        })
    }
})