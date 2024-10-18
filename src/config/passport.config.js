import passportLocal from "passport-local"
import passport from "passport"
import jwt from "passport-jwt"
import {PRIVATE_KEY} from "../utils/jsonwebtoken.js"

import { UsersManager } from "../dao/UsersManager.MongoDB.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"

/* const LocalStrategy = passportLocal.Strategy */

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

export const initializePassport = () => {

    const cookieExtractor = (req) => {
        let token = null

        if(req && req.cookies){
            token = req.cookies["token"]
        }
        return token
    }

    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    /* passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async(req, username, password, done) => {
        const { first_name, last_name, age, cart, role} = req.body

        try {
            let userFound = await UsersManager.getUser({email: username})

            if(userFound){
                return done("Error: usuario existente", false)
            }

            let newUser = {
                first_name,
                last_name,
                email:username,
                password: createHash(password),
                age,
                cart,
                role
            }

            let result = await UsersManager.createUser(newUser)
            console.log(result)
            return done(null, result)
        } catch (error) {
            return done("Error al crear usuario " + error)
        }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async(username, password, done) => {
        try {
            let userFound = await UsersManager.getUser({email: username})

            if(!userFound || !isValidPassword(userFound.password, password)) return done("Credenciales incorrectas", false)

            return done(null, userFound)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser(async(user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser( async(id, done) => {
        let user = await UsersManager.getUser({_id: id})
        if(user) return done(null, user)
    }) */
}