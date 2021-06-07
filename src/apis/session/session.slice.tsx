import { createSlice } from "@reduxjs/toolkit";
//@ts-ignore
import http from "superagent";
import config from "../config/config";

const gateway = config.api.gateway;

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
		login: (state, action) => {
			console.log(action.payload);
			const mail: string = action.payload.payload[0];
			const pass: string = action.payload.payload[1];
			console.log(mail, pass);
			if (mail && pass) {
				const url = gateway + "/auth/login";
				http.post(url)
					.set("accept", "application/json")
					.set("content-type", "application/json")
					.auth(mail, pass)
					.end((err: any, response: any) => {
						if (err) {
							if (err.status === 401) {
								// window.app.loader.hide(); //TODO: Implement
								return;
							}
						}
						state.session = {
							email: mail,
							token: response.body.access_token,
							credential: response.body.credential,
						};
						state.isLoggedIn = true;
						//FIXME: Cannot perform 'set' on a proxy that has been revoked
					});
			}
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.session = undefined;
		},
	},
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
