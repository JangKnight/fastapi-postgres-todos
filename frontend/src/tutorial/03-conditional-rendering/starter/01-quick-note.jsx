import { useEffect, useState } from "react";

const Note = () => {
  return (
    <section>
      <p className="text-2xl font-bold mb-4">Thanks for dropping by!</p>
      <p>
        This is just my sandbox site where I experiment with different security,
        typescript, and react concepts using docker, AWS, and a VPS.
      </p>
      <p>
        You may be interested in my{" "}
        <a
          className="text-indigo-400 hover:text-indigo-800"
          href="https://dev.anthonysjhenry.com"
        >
          portfolio that uses Vercel, OnRender, and NeonDB
        </a>
        .
      </p>
      <p>
        You may also be interested in the{" "}
        <a className="text-indigo-400 hover:text-indigo-800" href="/api/docs">
          API docs for this site
        </a>
        .
      </p>
    </section>
  );
};
export default Note;
