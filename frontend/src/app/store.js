import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/noteSlice'
import authReducer from '../features/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		notes: noteReducer,
		tickets: ticketReducer,
	},
})
