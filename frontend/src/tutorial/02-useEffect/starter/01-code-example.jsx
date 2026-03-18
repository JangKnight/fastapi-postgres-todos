import { useState, useEffect } from "react";

const CodeExample = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log("useEffect called -> value incremented");
  }, [value]);

  return (
    <div>
      <h2 className="mt-8">useEffect example</h2>
      <h6>value : {value}</h6>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </div>
  );
};
export default CodeExample;
