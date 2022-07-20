import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    bcrypt.hashSync(password,process.env.PASSWORD_SALT,(error, hash) =>{
        if(error) throw error;
        return hash;
    });
};

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}