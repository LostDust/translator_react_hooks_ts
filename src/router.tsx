import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import { reduxContext } from "@/store";
import Main from "@@/Main";
import NoteTable from "@@/NoteTable";

interface IRoutes {
  path: string;
  component?: { (props?: {}): JSX.Element };
  redirect?: string;
  auth?: boolean;
  exact?: boolean;
  children?: IRoutes[];
}

const rootRoutes: Array<IRoutes> = [
  {
    path: "/",
    exact: true,
    redirect: "/main"
  },
  {
    path: "/main",
    component: Main
  },
  {
    path: "/table",
    component: NoteTable
  }
];

interface IProps {
  match?: { url: string };
  routes?: [];
}
function RouteView(props: IProps): JSX.Element {
  // const { token } = React.useContext(reduxContext);
  const routes = props.routes || rootRoutes;
  const url = props.match ? `${props.match.url}/` : "";

  function routeRender(props, item: IRoutes): JSX.Element {
    if (item.redirect) return <Redirect to={item.redirect} />;
    // 鉴权 if (item.auth && token != "hello") return <Redirect to="/home" />;
    props.routes = item.children;
    return <item.component {...props} />;
  }

  return (
    <Switch>
      {routes.map((item, key) => {
        return (
          <Route
            key={key}
            path={`${url}${item.path}`}
            exact={item.exact ? true : false}
            render={(props): JSX.Element => routeRender(props, item)}
          />
        );
      })}
    </Switch>
  );
}

export default RouteView;
