const {mongoose} = require('mongoose')
const validator = require("validator")


const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        required:true,
        trim: true,
        validator(value){
            if(validator.isDecimal(value)) {
                throw new Error("task shouldn't be numbers")
            }
        }
    },
    completed: {
        type:"boolean",
        default: false
    },
},{
    timestamps: true,
})

const task = mongoose.model('task',taskSchema)

module.exports = task
