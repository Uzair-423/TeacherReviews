const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
    name: String,
    email: String,
    department: String,
    courses: [String],
    rating: Number  
})

const Professor = mongoose.model('Professor', ProfessorSchema);

module.exports = Professor;

