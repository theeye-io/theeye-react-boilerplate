import React from "react";
//@ts-ignore
import http from "superagent";
import config from "../config/config";

import store, { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./session.slice";

const gateway = config.api.gateway;

type cookie =
	| {
			email: string;
			token: string;
			credential: string;
	  }
	| undefined;

export default class Session {
	private s: cookie;

	constructor() {
		this.refreshLogin();
	}

	login(email: string, password: string) {
		console.log([email, password]);
		if (email && password) {
			const url = gateway + "/auth/login";
			http.post(url)
				//.send({ username, password }) // query string
				.set("accept", "application/json")
				.set("content-type", "application/json")
				.auth(email, password)
				.end((err: any, response: any) => {
					if (err) {
						if (err.status === 401) {
							// window.app.loader.hide(); //TODO: Implement
							return;
						}
					}
					this.s = {
						email: email,
						token: response.body.access_token,
						credential: response.body.credential,
					};
					// this.store();
				});
		}
	}

	// logout() {
	// 	this.s = undefined;
	// 	logoutGlobal();
	// }

	// private store() {
	// 	Store(this.s);
	// }

	refreshLogin() {
		this.s = store.getState().session.session;
	}
}
