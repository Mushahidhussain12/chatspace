import mongoose, { Schema } from "mongoose";

const refreshSchema = mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true });

const Refresh = mongoose.model("Refresh", refreshSchema, 'tokens');


export default Refresh;