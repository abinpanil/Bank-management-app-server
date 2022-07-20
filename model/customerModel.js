import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: [true, "CustomerId Required"]
    },
    loanACNo: {
        type: String,
        required: [true, "Loan AC No Required"]
    },
    name: {
        type: String,
        required: [true, "Name Required"]
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile No Required"]
    },
    barcode: {
        type: String,
    },
    amountPayable: {
        type: String,
        required: [true, "Amount Payable Required"]
    },
    noticeType: {
        type: String,
        required: [true, "Notice Type Required"]
    },
    filePath: {
        type: String,
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Banks',
        required: [true, "Bank Required"]
    }
});

const Customers = mongoose.model('Customers', customerSchema);
export default Customers;