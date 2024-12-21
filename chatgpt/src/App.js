// ここにコード書いていく
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const nameChangeHandler = (e) => {
    setName((prev) => e.target.value);
  };

  const handleButtonClick = () => {
    setMessage((prev) => `hello ${name}`);
  };
  return (
    <>
      <input type="text" onChange={(e) => setName(e.target.value)}></input>
      <button onClick={handleButtonClick}>say hello</button>
      <p>{message}</p>
    </>
  );
};

export default App;
