import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return initialState;
    case "double":
      return { ...state, count: state.count * 2 };
    case "step":
      return { ...state, step: action.payload };
    default:
      throw new Error("invalid action type");
  }
};

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>counter:{state.count}</h1>
      <span>step:</span>
      <input
        type="number"
        onChange={(e) =>
          dispatch({ type: "step", payload: parseInt(e.target.value) })
        }
        value={state.step}
      ></input>
      <br />
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "double" })}>double</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
};

export default UseReducer;
