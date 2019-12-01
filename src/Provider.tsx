import * as React from "react";
import { initStore, reducer, reduxContext } from "@/store";

interface IAction {
  key: string;
  type: string;
  value: string;
  save?: boolean;
}

function Provider(props: { children }): JSX.Element {
  const [store, storeDispatch] = React.useReducer(reducer, initStore);
  function dispatch(todo: IAction | { (): IAction }): void | Promise<IAction> {
    switch (typeof todo) {
      case "object":
        storeDispatch(todo);
        break;
      case "function":
        return new Promise((resolve, reject) => {
          const action = todo();
          if (action) resolve(action);
          else reject("Error");
        });
    }
  }

  return (
    <reduxContext.Provider value={{ ...store, dispatch }}>
      {props.children}
    </reduxContext.Provider>
  );
}

export default Provider;
