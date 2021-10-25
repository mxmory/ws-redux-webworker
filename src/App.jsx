import { getMessages } from "./index";

function App() {
  return (
    <div className="App">
      <div>
        press button to get queued messages from ws:
        <button onClick={getMessages}>press me!</button>
      </div>
    </div>
  );
}

export default App;
