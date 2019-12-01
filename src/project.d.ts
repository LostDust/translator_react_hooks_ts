interface IInitStore {
  NoteList: {
    local: Array<{}>;
    public: Array<{}>;
  };
  input: string;
  output: string;
  store: string;
  has: boolean;
  alertList: [];
}

// declare namespace common {}
