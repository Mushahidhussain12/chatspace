import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    phone: { type: String, required: true },
    avatar: { type: String, required: false },
    name: { type: String, required: false },
    activated: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);


export default User;