import { BrowserRouter } from "react-router";
import "./App.css";
import { Main } from "./routes/Main";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
