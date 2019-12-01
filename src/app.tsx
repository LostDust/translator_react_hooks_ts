import * as React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";

import Provider from "@/Provider";
import Root from "@/Root";

render(
  <ConfigProvider locale={zhCN}>
    <Provider>
      <Router>
        <Root />
      </Router>
    </Provider>
  </ConfigProvider>,
  document.querySelector("#app")
);
