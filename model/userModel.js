import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    username: {
        type: String,
        required: [true, "Name required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    role: {
        type: String,
        default: 'user'
    }
});

const Users = mongoose.model('Users', userSchema);
export default Users;