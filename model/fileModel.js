import  mongoose from 'mongoose';
const { Schema } = mongoose;

const fileSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: [true, "File Required"]
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customers',
    },
}, { timestamps: true });

const Files = mongoose.model("Files", fileSchema);
export default Files;


