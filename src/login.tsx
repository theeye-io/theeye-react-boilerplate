import React, { useState } from "react";
import "./login.scss";
import { Login } from "./apis/session/session.handler";
import store from "./apis/store";
import { useHistory } from "react-router-dom";
import queryParams from "./apis/queryParams";

import logo from "./assets/logo.png";
import glogo from "./assets/google.png";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBiNjMwYTRkNmRmM2MwMDEyNzBhMjU5IiwiaWF0IjoxNjIzNDQxMDk0LCJleHAiOjE2MjM0NTE4OTR9.ywyHiQGs-BnwuVExvG9jZqgNjw6xDS-EJLVPEyacKXk

function LoginPage() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const history = useHistory();

    const btnLogin = (email: string, passw: string) => {
        Login(email, passw);
    };

    const params = queryParams.get();

    console.log(params);
    const redir = params.redirect_callback;

    const handleState = () => {
        const state = store.getState();
        console.log(state);
        if (state.session.profile) {
            console.log("Is logged in!");
            if (redir != undefined)
                window.location.href =
                    redir +
                    "?" +
                    queryParams.set({
                        access_token: state.session.session?.payload?.token,
                    });
            else history.push("/main");
        }
    };

    store.subscribe(handleState);

    return (
        <div className="container">
            <div className="logo">
                <img src={logo} alt="TheEye" />
                <p>
                    Adding value to humen talent by automating repetitive tasks.
                </p>
            </div>
            <div className="login-container">
                <div className="login-wrapper">
                    <div className="title">Sign in</div>
                    <a href="https://app.theeye.io/login?_ga=2.116866627.453616413.1619995040-1771070425.1597764936">
                        <img src={glogo} alt="Google" />
                    </a>
                    <p>or</p>
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
                        <div className="text-center">
                            <button
                                className="submit-btn"
                                onClick={() => btnLogin(user, pass)}
                            >
                                SIGN IN
                            </button>
                            <a className="smaller" href="/password/reset">
                                Forgot your password?
                            </a>
                            <p className="smaller">
                                Don't have an account?
                                <a className="smaller orange" href="/register">
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <a href="https://theeye.io">theeye.io</a> | Copyright © 2021
                THEEYE INC.
            </footer>
        </div>
    );
}

export default LoginPage;
