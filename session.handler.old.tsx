import React from "react";
//@ts-ignore
import http from "superagent";
import config from "../config/config";

import store, { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { login as gLogin, logout as gLogout } from "./session.slice";

const gateway = config.api.gateway;

type cookie =
	| {
			email: string;
			token: string;
			credential: string;
	  }
	| undefined;

export default function SessionHandler() {
	let s: cookie;

	const dispatch = useDispatch();

	RefreshLogin = () => {
		s = useSelector((state: RootState) => state.session.session);
	};
	RefreshLogin();

	const store = () => {
		dispatch(gLogin({ payload: s }));
	};

	const login = (email: string, password: string) => {
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
					s = {
						email: email,
						token: response.body.access_token,
						credential: response.body.credential,
					};
					store();
				});
		}
	};

	const logout = () => {
		dispatch(gLogout());
	};
}
