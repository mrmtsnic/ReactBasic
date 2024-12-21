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
    const newTodo = { id: generateId(), text: todo };
    const _todos = [...todos, newTodo];
    setTodos(_todos);
    setTodo("");
  };

  const deleteTodo = (id) => {
    console.log(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <p>現在タスクはありません</p>
      ) : (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.text}-{todo.id}
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
              </li>
            );
          })}
        </ul>
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
