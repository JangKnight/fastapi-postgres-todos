import UseStateBasics from "./tutorial/01-useState/starter/02-useState-basics";
import UseStateWithArrays from "./tutorial/01-useState/starter/03-useState-array";
import UseEffect from "./tutorial/02-useEffect/starter/01-code-example";
import FetchData from "./tutorial/02-useEffect/starter/04-fetch-data";

import Ct from "./components/counting";
import Arr from "./components/arr";

function App() {
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
      <FetchData />
    </div>
  );
}

export default App;
