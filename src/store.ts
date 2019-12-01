import { createContext } from "react";
import { message } from "antd";

const reduxContext = createContext(null);

const local = Object.keys(localStorage).map(item => {
  return { from: item, to: localStorage.getItem(item), key: item };
});
interface IInitStore {
  noteList: {
    local: Array<{}>;
    public: Array<{}>;
  };
  input: string;
  output: string;
  store: string;
  has: boolean | string;
}
const initStore: IInitStore = {
  noteList: {
    local,
    public: [],
  },
  input: "hello",
  output: "",
  store: "local",
  has: false,
};

function publicSave(publicNote: [], msg): void {
  fetch(`http://203.195.141.131:3100/save/`, {
    method: "POST",
    body: JSON.stringify(publicNote),
    headers: { "content-type": "application/json" },
  })
    .then(res => res.text())
    .then(res => {
      console.log(res);
      message.info(msg);
    });
}

interface IAction {
  key: string;
  type: string;
  value: string;
  save?: boolean;
}
function reducer(state: { noteList }, { type, key, value, save }: IAction): {} {
  const newState = Object.assign({}, state);
  switch (type) {
    case "UPDATE":
      newState[key] = value;
      // if (action.save) console.log(action.save);
      if (save) publicSave(state.noteList.public, save);
      return newState;
    default:
      return state;
  }
}

export { reduxContext, reducer, initStore };
