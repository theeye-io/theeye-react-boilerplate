import http from "superagent";
import config from "../config/config";

import store from "../store";
import { storeLogin, storeLogout, storeProfile, cookie, profile } from "./session.slice";

const gateway = config.api.gateway;

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
                    payload: undefined,
                    email: mail,
                    token: response.body.access_token,
                    credential: response.body.credential,
                };
                store.dispatch(storeLogin({ payload: c }));
                getProfile();
            });
    }
}

export function LoginByToken(token:string) {
    const cookie: cookie = {
        token: token,
        payload: undefined,
        credential: "",
        email: ""
    }
    store.dispatch(storeLogin({ payload: cookie }));
    getProfile();
}

export function Logout() {
    store.dispatch(storeLogout());
}

export function Register(user: string, mail: string) {
    if (user && mail) {
        const url = gateway + "/registration/register";
        const packet = {
            email: mail,
            name: user,
            username: mail,
        };
        http.post(url)
            .set("accept", "application/json")
            .set("content-type", "application/json")
            .send(packet)
            .end((err: any, response: any) => {
                if (err) {
                    if (err.status === 401) {
                        // window.app.loader.hide(); //TODO: Implement
                        return;
                    }
                } else {
                    console.log("Registered!");
                }
            });
    }
}

export function recover(mail: string) {
    if (mail) {
        const url = gateway + "/auth/password/recover";
        const packet = { email: mail };
        http.post(url)
            .set("accept", "application/json")
            .set("content-type", "application/json")
            .send(packet)
            .end((err: any, response: any) => {
                if (err) {
                    if (err.status === 401) {
                        // window.app.loader.hide(); //TODO: Implement
                        return;
                    }
                } else {
                    console.log("Sent password reset");
                }
            });
    }
}

export function getProfile(next: Function = () => {}) {
    const url = `${gateway}/session/profile`;
    const state = store.getState();
    const access_token = state.session.session?.payload?.token;
    http.get(url)
        .query({ access_token }) // query string
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .end((err, response) => {
            let profile: profile = response.body;
            if (err) {
                Logout();
                return next(err);
            }
                store.dispatch(storeProfile({ payload: profile }));
            next(null, profile);
        });
}
