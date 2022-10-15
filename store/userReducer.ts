import { HYDRATE } from 'next-redux-wrapper'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'store'
import { UserDocument } from 'shared/types/user'

type TInitialState = {
	loading: boolean
	error: string
	user: UserDocument
}

const initialState: TInitialState = {
	loading: false,
	error: '',
	user: {
		id: '',
		name: '',
		email: ''
	}
}

const { reducer, actions } = createSlice({
	name: 'user',
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: ''
		}),
		failed: (state, action: PayloadAction<string>) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		getUserById: (state, action: PayloadAction<UserDocument>) => ({
			...state,
			loading: false,
			user: action.payload
		})
	},
	extraReducers: {
		[HYDRATE]: (state, action: PayloadAction<any>) => ({
			...state, 												// state = all slices: userSlice + productSlice + ...
			user: { 													// userSlice
				...state.user, 									// copy previouse state of userSlice
				...action.payload.user.user 		// override by allSlice.userSlice.userObject
			}
		})
	}
})
export default reducer

export const getUserById = () => async (dispatch: AppDispatch) => {
	dispatch( actions.requested() )
	const user = {
		id: '1',
		name: 'name',
		email: 'email'
	}
	dispatch( actions.getUserById(user) )
}