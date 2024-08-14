import mongoose from mongoose;
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    recordDate: { type: Date, required: true },
    notes: { type: String },
    treatment: { type: String },
    medications: [{
        name: { type: String },
        dosage: { type: String }
    }]
});

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
export default MedicalRecord
