import { Document } from 'camo'

export default class Character extends Document {
    name: String
    description: String
    hp: Number
    maxhp: Number

    constructor() {
        super('Character')
        this.schema({
            name: String,
            description: String,
            hp: Number,
            maxhp: Number,
        })
    }
}
