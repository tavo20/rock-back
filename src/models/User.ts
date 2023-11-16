import { Schema, model, Document } from 'mongoose';
import bcry from 'bcryptjs';


export interface IUser  extends Document {
    name: string,
    nick: string,
    email: string,
    password: string,
    role: string,
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
    nick: {
        type: String,
        require: false,
        min: 4,
        lowercase: true,
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
    role: {
        type: String,
        default: 'USER',
        require: true,
        enum: ['USER', 'ADMIN'], // SUPER-ADMIN - ADMIN - USER - MASTER-ADMIN.
        // SUPER-ADMIN: Can do everything. Mi usuario. Puedo ver todo lo que hacen los demas.
        // ADMIN: Administra un establecimiento.
        // USER:
        // MASTER-ADMIN: Pueden crear nuevos usuarios para administrar varios establecimiento.
    },
    imageAdmin: {
        type: String,
        require: false,
    },
    language: {
        type: String,
        require: false,
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
