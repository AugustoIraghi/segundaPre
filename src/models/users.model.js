import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: false,
    _uid: mongoose.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;