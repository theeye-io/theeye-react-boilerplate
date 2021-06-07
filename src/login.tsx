import React, { useState } from "react";
import "./login.scss";
import { Login } from "./apis/session/session.handler";
import store from "./apis/store";

export default function LoginPage() {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");

	const btnLogin = (email: string, passw: string) => {
		Login(email, passw);
	};

	const handleState = () => {
		const state = store.getState();
		console.log(state);
		if (state.session.isLoggedIn) {
			console.log("Is logged in!");
		}
	};

	handleState();

	store.subscribe(handleState);

	return (
		<div className="container">
			<div className="logo">
				<img src="./assets/logo.png" alt="TheEye" />
				<p>
					Adding value to humen talent by automating repetitive tasks.
				</p>
			</div>
			<div className="login-container">
				<div className="title">Sign in</div>
				<div className="form">
					<input
						value={user}
						onChange={(
							e: React.ChangeEvent<HTMLInputElement>
						): void => setUser(e.target.value)}
						type="text"
						name="email"
						placeholder="e-mail"
						required
					></input>
					<input
						value={pass}
						onChange={(
							e: React.ChangeEvent<HTMLInputElement>
						): void => setPass(e.target.value)}
						type="password"
						name="password"
						placeholder="password"
						required
					></input>
					<button
						className="submit-btn"
						onClick={() => btnLogin(user, pass)}
					>
						SIGN IN
					</button>
				</div>
			</div>
			<footer className="footer">
				<a href="https://theeye.io">theeye.io</a> | Copyright © 2021
				THEEYE INC.
			</footer>
		</div>
	);
}
