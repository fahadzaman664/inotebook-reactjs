const mongoose = require('mongoose');
const { Schema } = mongoose;
const NoteSchema = new Schema({
    // link user to notes
    // its like foreign key
    // here object id is of another model
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
       
    },
    tag: {
        type: String,
       default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },

}
);

module.exports = mongoose.model('Note', NoteSchema);