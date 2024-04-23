import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new Schema({
   user_id:  {type: ObjectId},
   plants: [{ type: ObjectId, ref: 'Plant' }]
});

const UserModel =  mongoose.model(
    "User", UserSchema
);

export default UserModel;