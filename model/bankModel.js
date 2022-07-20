import  mongoose from 'mongoose';
const { Schema } = mongoose;

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: [true, "Bank Name Required"]
    },
    address: {
        type: String,
        required: [true, "Address Required"]
    },
    collectionManager: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    legalManager: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
}, { timestamps: true });

const Banks = mongoose.model("Banks", bankSchema);
export default Banks;


