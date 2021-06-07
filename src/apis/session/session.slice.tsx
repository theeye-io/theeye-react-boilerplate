import { createSlice } from "@reduxjs/toolkit";

type cookie =
	| {
			email: string;
			token: string;
			credential: string;
	  }
	| undefined;

export const sessionSlice = createSlice({
	name: "session",
	initialState: {
		isLoggedIn: false as boolean,
		session: undefined as cookie,
	},
	reducers: {
		storeLogin: (state, action) => {
			state.session = action.payload;
			state.isLoggedIn = true;
		},
		storeLogout: (state) => {
			state.isLoggedIn = false;
			state.session = undefined;
		},
	},
});

export const { storeLogin, storeLogout } = sessionSlice.actions;

export default sessionSlice.reducer;
