import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Logout } from './apis/session/session.handler';
import store from "./apis/store";

function MainPage() {
    const history = useHistory()

    const handleState = () => {
		const state = store.getState();
		console.log(state);
		if (state.session.isLoggedIn == false) {
			console.log("Is logged out!");
            history.push("/login")
		}
	};

	store.subscribe(handleState);

    return (
        <div>
            <h1>Logged in!</h1>
            <button onClick={Logout}>Log out</button>
        </div>
    );
}

export default MainPage