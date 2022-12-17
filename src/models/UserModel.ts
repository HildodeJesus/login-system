import { Schema, model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
