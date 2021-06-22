import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./login";
import TokenLoginPage from "./tokenLogin";
import MainPage from "./main";
import RegisterPage from "./register";
import PasswordResetPage from "./pwdReset";
import IndicatorsDashboard from "./indicatorsDashboard";
import { Provider } from "react-redux";
import store from "./apis/store";
import { getProfile } from "./apis/session/session.handler";
import { fetchIndicators } from "./apis/indicators/indicators.handler";

let alreadyChecked = false;

const HandleInitialState = () => {
    let history = useHistory();
    const handleState = () => {
        const state = store.getState();
        console.log(state);
        if (!alreadyChecked) {
            getProfile((err: any, profile: any) => {
                alreadyChecked = true;
            });
        }
        if (state.session.profile) 
            history.push("/main")
        else history.push("/login");
    };
    store.subscribe(handleState);
    return <></>;
};

const FourOhFour = () => {
    return <h1>404</h1>;
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={HandleInitialState}
                        ></Route>
                        <Route path="/login" component={LoginPage}></Route>
                        <Route
                            path="/tokenlogin"
                            component={TokenLoginPage}
                        ></Route>
                        <Route path="/main" component={IndicatorsDashboard}></Route>
                        <Route path="/logout" component={MainPage}></Route>
                        <Route
                            path="/register"
                            component={RegisterPage}
                        ></Route>
                        <Route
                            path="/password/reset"
                            component={PasswordResetPage}
                        ></Route>
                        <Route path="*" component={FourOhFour}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
