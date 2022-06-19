import Header from "./header/Header";
import TodoList from "./table/TodoList";
import style from "../css/App.module.css";

function App() {
    return (
        <div className={style.todo_app}>
            <Header />
            <TodoList />
        </div>
    );
}

export default App;
