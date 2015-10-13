import { Document } from 'camo'

export default class User extends Document {
    username: String
    is_admin: Boolean
    is_dm: Boolean

    constructor() {
        super('User')
        this.schema({
            username: String,
            is_admin: Boolean,
            is_dm: Boolean,
        })
    }
}