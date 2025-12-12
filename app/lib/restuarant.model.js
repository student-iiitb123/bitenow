import mongoose from 'mongoose'

const schema = mongoose.schema

const userSchema= new schema({
    name:{type:String,
        required:true
    }
})

const User = mongoose.models('restuarants',userSchema) || mongoose.models.restuarants

export default User; 