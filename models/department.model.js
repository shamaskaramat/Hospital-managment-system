import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    // doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctor' }]
    doctors: [{ type: String }] // Change to store names as strings

});

const Department = mongoose.model('Department', DepartmentSchema);
export default Department