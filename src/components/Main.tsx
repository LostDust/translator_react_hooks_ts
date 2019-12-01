import * as React from "react";
import { CSSTransition } from "react-transition-group";
import Translate from "@@/Translate";
import Menubar from "@@/Menubar";

function Main(): JSX.Element {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setShow(true);
    return (): void => {
      setShow(false);
    };
  }, []);

  return (
    <CSSTransition in={show} classNames="fade" timeout={400}>
      <section>
        <Translate></Translate>
        <br />
        <Menubar></Menubar>
      </section>
    </CSSTransition>
  );
}

export default Main;
