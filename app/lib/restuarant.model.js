import mongoose from 'mongoose';

const schema = mongoose.Schema



const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

     restuarant:{
        type:String,
        required:true

    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.restuarants 
  || mongoose.model('restuarants', userSchema);

export default User;
