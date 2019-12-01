import * as React from "react";
const { useContext, useState } = React;
import { reduxContext } from "@/store";
import { Input, Row, Col, Select, Button } from "antd";
const { Option } = Select;

function Translate(): JSX.Element {
  const { input, output, noteList, store, dispatch } = useContext(reduxContext);
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("zh");

  function handleStore(e, key: string): void {
    dispatch({
      type: "UPDATE",
      key: key,
      value: e.target.value,
    });
  }
  function translation(): void {
    if (!input) return;

    fetch(
      `http://203.195.141.131:3100/api?q=${input}&from=${fromLang}&to=${toLang}`
    )
      .then(res => res.text())
      .then(msg => {
        dispatch({ type: "UPDATE", key: "output", value: msg });
      });

    const result = noteList[store].some(item => item.from === input);
    dispatch({
      type: "UPDATE",
      key: "has",
      value: result ? true : false,
    });
  }

  return (
    <section>
      <Row>
        <Col span={18}>
          <Input.TextArea
            rows={4}
            value={input}
            onChange={(e): void => handleStore(e, "input")}></Input.TextArea>
        </Col>
        <Col span={1} />
        <Col span={5}>
          <Select
            value={fromLang}
            onChange={setFromLang}
            style={{ width: "100%" }}>
            <Option value="en">英文</Option>
            <Option value="auto">其他</Option>
          </Select>
          <Select value={toLang} onChange={setToLang} style={{ width: "100%" }}>
            <Option value="zh">中文</Option>
            <Option value="en">英文</Option>
          </Select>
          <Button
            type="primary"
            onClick={translation}
            style={{ width: "100%" }}>
            翻译
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Input.TextArea
            rows={4}
            value={output}
            onChange={(e): void => handleStore(e, "output")}></Input.TextArea>
        </Col>
      </Row>
    </section>
  );
}

export default Translate;
