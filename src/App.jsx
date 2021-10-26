import { getMessages, getBlockingMessages } from "./index";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const value = useSelector((state) => state.values.value);
  const [rand, setRand] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randVal = Math.floor(Math.random() * (255 - 10 + 1) + 10);
      setRand(randVal);
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <div>
        press button to get queued messages from ws:
        <div style={{ border: "1px solid", padding: "1em" }}>
          <button onClick={getMessages}>Workerized</button>
        </div>
        <br />
        <div style={{ border: "1px solid red", padding: "1em" }}>
          <button onClick={getBlockingMessages}>Blocking</button>
        </div>
        <hr />
        <h1>Redux store value: {value}</h1>
        <hr />
        <div>
          <h2>Example of UI thread blocking behaviour:</h2>
          <div
            // just random sh#t
            style={{
              transition: "0.2s ease",
              padding: "2em",
              background: `rgba(${rand}, ${Math.abs(rand - 128)}, ${Math.abs(
                rand - 255
              )})`,
            }}
          >
            random changing value: {rand}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
