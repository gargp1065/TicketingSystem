const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    issueType: {
        type: String,
        enum: ['bug', 'task'],
        default: 'task'
    }, 
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status: {
        type:String, 
        enum: ['open', 'inprogress', 'inreview', 'codecomplete', 'QA', 'done'],
        default: 'open'
    }
});

module.exports = Issue = mongoose.model("isuues", IssueSchema);

