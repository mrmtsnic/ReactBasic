import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addTodo = () => {
    if (todo === "") {
      setError("TODOを入力してください。");
      return;
    }
    setError("");
    const newTodo = { id: generateId(), text: todo, status: "pending" };
    const _todos = [...todos, newTodo];
    setTodos(_todos);
    setTodo("");
  };

  const deleteTodo = (id) => {
    console.log(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const changeStatus = (id) => {
    console.log(id);
    setTodos((prev) =>
      prev.map((todo) => {
        console.log(todo);
        if (id === todo.id) {
          if (todo.status === "completed") {
            return { ...todo, status: "pending" };
          } else {
            return { ...todo, status: "completed" };
          }
        }
        return todo;
      })
    );
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <p>現在タスクはありません</p>
      ) : (
        <div>
          <ul>
            {todos.map((todo) => {
              return (
                <li
                  key={todo.id}
                  className={todo.status === "completed" ? "done" : ""}
                >
                  {todo.text}-{todo.id}
                  <button onClick={() => changeStatus(todo.id)}>
                    {todo.status === 0 ? "完了" : "未完了に戻す"}
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>delete</button>
                </li>
              );
            })}
          </ul>
          <button onClick={clearTodos}>全て削除</button>
        </div>
      )}
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      ></input>

      <button onClick={addTodo}>add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Todo;
