import mongoose from 'mongoose';

const partiesSchema = new mongoose.Schema({
   party_name: { type: String, required: true },
   candidate_name: { type: String, required: true },
   party_symbol: { type: String},
});


export default mongoose.model("Party", partiesSchema);