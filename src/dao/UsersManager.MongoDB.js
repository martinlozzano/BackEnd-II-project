import { userModel } from "./models/users.model.js"

export class UsersManager {
    static async getAllUsers() {
        return await userModel.find()
    }

    static async getUser(filter) {
        return await userModel.findOne(filter)
    }

    static async createUser(newUser) {
        return await userModel.create(newUser)
    }

    static async updateUser(filter, dataToUpdate) {
        return await userModel.findOneAndUpdate(filter, dataToUpdate)
    }

    static async deleteUser(uid) {
        return await userModel.findByIdAndDelete({_id: uid})
    }
}
