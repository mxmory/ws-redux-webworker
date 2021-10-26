import { getMessages, getBlockingMessages } from "../index";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./App.module.css";

function App() {
  const value = useSelector((state) => state.values.value);
  const [rand, setRand] = useState(0);

  useEffect(() => {
    // This is to visualize ui repaint process;
    const interval = setInterval(() => {
      const randVal = Math.floor(Math.random() * (255 - 10 + 1) + 10);
      setRand(randVal);
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={style.appWrapper}>
      <div>
        <h1>Press button to get queued messages from ws:</h1>
        <div className={style.buttons}>
          <button onClick={getMessages}>Workerized</button>
          <button onClick={getBlockingMessages}>Blocking</button>
        </div>

        <div className={style.valueWrapper}>
          <h1>Redux store value: {value}</h1>
        </div>

        <div>
          <h2>Example of UI thread blocking behaviour:</h2>
          <div
            className={style.uiWrapper}
            // just random sh#t
            style={{
              background: `rgba(${rand}, ${Math.abs(rand - 128)}, ${Math.abs(
                rand - 255
              )})`,
            }}
          >
            <h3>random changing value: {rand}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
