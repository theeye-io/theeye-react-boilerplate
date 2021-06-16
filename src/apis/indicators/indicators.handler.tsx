import React from 'react';
import http from "superagent";
import config from "../config/config";

import store from "../store";
import { edit, setIndicator } from "./indicators.slice";

const core = config.api.core;

export function fetchIndicators() {
    const access_token = store.getState().session.session?.payload?.token
    if (access_token) {
        const url = core + "/indicator";
        http.get(url)
            .set("accept", "application/json")
            .set("content-type", "application/json")
            .query({ access_token }) // query string
            .end((err: any, response: any) => {
                if (err) {
                    if (err.status === 401) {
                        // window.app.loader.hide(); //TODO: Implement
                        return;
                    }
                }
                console.log(response.body);
                store.dispatch(setIndicator({payload: response.body}));
            });
    }
}
