const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({

    name: {
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
    }

})

module.exports = Project = mongoose.model("projects", ProjectSchema);