import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleButtonClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <h3>counter</h3>
      <p>{count}</p>
      <button onClick={handleButtonClick}>countUp</button>
    </>
  );
};

export default Counter;
