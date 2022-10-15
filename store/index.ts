import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import userReducer from './userReducer'

const makeStore = () => configureStore({
	reducer: {
		user: userReducer
	}
})

export const wrapper = createWrapper( makeStore, { debug: false })

type Store = ReturnType<typeof makeStore>
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
