"use client"
import { useState } from "react";


const Component = ({ prop }: { prop: string }) => {
  return (
    <>
      {prop}
    </>
  );
}
export default function Test() {
  const [state, setState] = useState<number>(0);

  return (
    <div>
      <button onClick={() => setState(state + 1)}>
        Click me
      </button>
      {state}
      <Component prop={state.toString()} />
    </div>
  )
}