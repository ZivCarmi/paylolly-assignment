import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { TasksProvider } from "./contexts/TasksContext";

if (document.getElementById("App")) {
    ReactDOM.render(
        <TasksProvider>
            <App />
        </TasksProvider>,
        document.getElementById("App")
    );
}
