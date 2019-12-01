import * as React from "react";
import { Select, Icon, message } from "antd";
const { Option } = Select;

import { reduxContext } from "@/store";

function Menubar(): JSX.Element {
  const { store, has, input, output, noteList, dispatch } = React.useContext(
    reduxContext
  );

  function handleStore(val, key: string): void {
    dispatch({
      type: "UPDATE",
      key: key,
      value: val,
    });

    const result = noteList[val].some(item => item.from === input);
    dispatch({
      type: "UPDATE",
      key: "has",
      value: result ? true : false,
    });
  }
  function addItem(): void {
    if (!input || !output) return;
    if (has) return;

    noteList[store].push({ from: input, to: output, key: input });
    dispatch({
      type: "UPDATE",
      key: "noteList",
      value: noteList,
      save: store === "public" && "添加成功",
    });
    if (store === "local") {
      localStorage.setItem(input, output);
      message.info("添加成功");
    }
    dispatch({ type: "UPDATE", key: "has", value: true });
  }

  return (
    <section>
      <label>收藏到：</label>
      <Select
        value={store}
        onChange={(val): void => handleStore(val, "store")}
        style={{ margin: "0 30px" }}>
        <Option value="local">本地仓库</Option>
        <Option value="public">公共仓库</Option>
      </Select>
      <Icon
        type="star"
        onClick={addItem}
        // twoToneColor={has ? "#52c41a" : "#1890ff"}
        theme={has ? "twoTone" : "outlined"}
        style={{
          cursor: "pointer",
          fontSize: "30px",
          position: "relative",
          top: "6px",
        }}
      />
    </section>
  );
}

export default Menubar;
