import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import RootContainer from "./components/root-container/RootContainer";
import "./styles.scss";
import { store } from "./reducers";

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <RootContainer/>
        </Provider>
    );
}
