import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({

    subjectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject",
        required : true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    title : {
        type : String,
        required : true
    },

    status : {
        type : String,
        enum : ["pending", "completed", "revision"],
        default : "pending"
    },

    priority : {
        type : String,
        enum : ["low", "medium", "high"],
        default : "medium"
    },

    plannedDate : {
        type : Date
    },

    completedDate : {
        type : Date
    },

    revisionCount : {
        type : Number,
        default : 0
    },

    estimatedMinutes : {
        type : Number,
        default : 30
    },

    isDeleted : {
        type : Boolean,
        default : false
    }

}, { timestamps : true });

topicSchema.index({ userId : 1});
topicSchema.index({ subjectId : 1 });
topicSchema.index({ status : 1 });

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;