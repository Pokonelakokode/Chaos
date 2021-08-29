import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import RootContainer from "./components/root-container/RootContainer";
import "./styles.scss";
import {store} from "./reducers";

render(
    <Provider store={store}>
        <RootContainer/>
    </Provider>,
    document.getElementById("app"),
);
