import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// Prevent duplicate subjects per user
subjectSchema.index({ userId: 1, name: 1 }, { unique: true });

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;