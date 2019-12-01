// interface IAction

function thunk(todo: { (): { type } }): Promise<{}> {
  return fetch("url");
}

export default thunk;

// getData(url).then(msg => dispatch(msg));
