import * as React from "react";
import { Typography, version } from "antd";
import { reduxContext } from "@/store";
const { Title } = Typography;
import "antd/dist/antd.min.css";
import "@/transition.css";

import RouteView from "@/router";
import Navbar from "@@/Navbar";

function Root(): JSX.Element {
  const { noteList, dispatch } = React.useContext(reduxContext);

  React.useEffect(() => {
    fetch(`http://203.195.141.131:3100/database/`)
      .then(res => res.json())
      .then(msg => {
        noteList.public = msg;
        dispatch({
          type: "UPDATE",
          key: "noteList",
          value: noteList
        });
      });
  }, []);

  return (
    <main
      style={{
        margin: "0 auto",
        paddingTop: "5vh",
        width: "60vw",
        overflow: "hidden"
      }}>
      <Title level={1}>Ant Design Version: {version}</Title>
      <Navbar />
      <br />
      <RouteView />
      {/* <RouteView {...props} /> 子路由 */}
    </main>
  );
}

export default Root;
