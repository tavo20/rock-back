import { Schema, model, Document } from 'mongoose';
import bcry from 'bcryptjs';


export interface IUser  extends Document {
    name: string,
    email: string,
    password: string,
    user: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string, userPassword: string): Promise<boolean>,
    _id: string
    token?: string
};


const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        min: 4,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true
});


userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcry.genSalt(10);
    return bcry.hash(password, salt)
};

userSchema.methods.validatePassword =  async function(password: string, userPassword: string): Promise<boolean> {
    return await bcry.compare(password, userPassword);

}

export default model<IUser>('User', userSchema);
