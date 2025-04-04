import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
   party_id: { type: String, required: true },
   party_name: { type: String, required: true },
   vote_count: { type: String, required: true },
   
}, { timestamps: true });


export default mongoose.model("Vote", voteSchema);