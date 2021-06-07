//@ts-ignore
import http from "superagent";
import config from "../config/config";

import store from "../store";
import { storeLogin, storeLogout } from "./session.slice";

const gateway = config.api.gateway;

type cookie =
	| {
			email: string;
			token: string;
			credential: string;
	  }
	| undefined;

export function Login(mail: string, pass: string) {
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
				const c: cookie = {
					email: mail,
					token: response.body.access_token,
					credential: response.body.credential,
				};
				store.dispatch(storeLogin({ payload: c }));
			});
	}
}

export function Logout() {
	store.dispatch(storeLogout());
}
