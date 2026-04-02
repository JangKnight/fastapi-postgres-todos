import { useState } from "react";
import UseStateBasics from "./tutorial/01-useState/starter/02-useState-basics";
import UseStateWithArrays from "./tutorial/01-useState/starter/03-useState-array";
import UseEffect from "./tutorial/02-useEffect/starter/01-code-example";
import FetchData from "./tutorial/02-useEffect/starter/04-fetch-data";
import AuthData from "./tutorial/02-useEffect/starter/04-auth-data";
import AuthReg from "./tutorial/02-useEffect/starter/04-auth-reg";
import Note from "./tutorial/03-conditional-rendering/starter/01-quick-note";
import FetchProfile from "./tutorial/03-conditional-rendering/starter/02-fetch-profile";
import FetchAdmin from "./tutorial/03-conditional-rendering/starter/03-admin-rule";
import Ct from "./components/counting";
import Arr from "./components/arr";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [adminRefresh, setAdminRefresh] = useState(0);

  return (
    <div className="container">
      <Note />
      <hr className="my-10" />
      <FetchProfile />
      <hr className="my-10" />
      <h2 className="text-2xl font-bold mb-4">Todo App</h2>
      <AuthReg onUserCreated={() => setAdminRefresh((c) => c + 1)} />
      <AuthData setToken={setToken} />
      <FetchData token={token} />
      <hr className="my-10" />
      <FetchAdmin token={token} refreshKey={adminRefresh} />
    </div>
  );
}

export default App;
