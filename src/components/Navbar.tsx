import * as React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
const { SubMenu } = Menu;

function Navbar(): JSX.Element {
  return (
    <section>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to="/main">翻译</Link>
        </Menu.Item>
        <SubMenu title="收藏夹">
          <Menu.Item>
            <Link to={`/table?table=public`}>public</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/table?table=local`}>local</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </section>
  );
}

export default Navbar;
