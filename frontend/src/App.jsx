import { useState } from "react";
import UseStateBasics from "./tutorial/01-useState/starter/02-useState-basics";
import UseStateWithArrays from "./tutorial/01-useState/starter/03-useState-array";
import UseEffect from "./tutorial/02-useEffect/starter/01-code-example";
import FetchData from "./tutorial/02-useEffect/starter/04-fetch-data";
import AuthData from "./tutorial/02-useEffect/starter/04-auth-data";
import AuthReg from "./tutorial/02-useEffect/starter/04-auth-reg";
import Ct from "./components/counting";
import Arr from "./components/arr";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div className="container">
      <UseStateBasics />
      <Ct />
      <hr className="my-10" />
      <UseStateWithArrays />
      <Arr />
      <hr className="my-10" />
      <UseEffect />
      <hr className="my-10" />
      <h2 className="text-2xl font-bold mb-4">Todo App</h2>
      <AuthReg />
      <AuthData setToken={setToken} />
      <FetchData token={token} />
    </div>
  );
}

export default App;
