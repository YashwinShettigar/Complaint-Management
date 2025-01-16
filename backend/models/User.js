const mongoose = require('mongoose');

//User schema
const UserSchema = new mongoose.Schema({
  username:{type:String,required:true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;