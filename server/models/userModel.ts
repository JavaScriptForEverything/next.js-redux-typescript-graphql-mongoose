import { Schema, model, models, Model } from 'mongoose'
import { UserDocument } from 'shared/types/user'


const userSchema = new Schema<UserDocument>({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	}
}, {
	timestamps: true
})

const userModel: Model<UserDocument> = models.User || model<UserDocument>('User', userSchema)
export default userModel