import { Schema, model, models, Model } from 'mongoose'
import { User } from 'shared/types/user'


const userSchema = new Schema<User>({
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

const userModel: Model<User> = models.User || model<User>('User', userSchema)
export default userModel