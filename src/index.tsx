import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./login";
import { Provider } from "react-redux";
import store from "./apis/store";

ReactDOM.render(
	<React.StrictMode>
		<body>
			<Provider store={store}>
				<Login></Login>
			</Provider>
		</body>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
