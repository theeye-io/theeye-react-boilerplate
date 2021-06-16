import React from 'react';
import { LoginByToken } from './apis/session/session.handler';
import queryParams from "./apis/queryParams";
import { useHistory } from 'react-router-dom';
import store from './apis/store';

export default function TokenLoginPage() {
	const history = useHistory()
	const params = queryParams.get();

    LoginByToken(params.access_token)

    const handleState = () => {
		const state = store.getState();
		console.log(state);
		if (state.session.profile) {
			console.log("Is logged in!");
			history.push("/main")
		} 
    }
    return <></>;
}
