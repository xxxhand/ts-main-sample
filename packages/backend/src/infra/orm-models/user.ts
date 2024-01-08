import { Schema, Document } from 'mongoose';
import { ModelCodes } from '../../domain/enums/model-codes';

export const usesrModelName = ModelCodes.USER;

interface IDocumentModel {
	name: string,
	age: string,
};

export interface IUserDocument extends IDocumentModel, Document { };

export const userSchema = new Schema({
	name: { type: String, required: true },
	birthDate: { type: Date },
	group: { type: [String] },
	personalId: { type: String, required: true },
	phone: { type: String },
	email: { type: String },
	account: { type: String, required: true },
	password: { type: String },
	salt: { type: String },
	avatar: { type: Schema.Types.ObjectId },
},
	{
		timestamps: true,
		versionKey: false,
	});
