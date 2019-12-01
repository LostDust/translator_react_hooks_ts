import * as React from "react";
import { Table, Icon, message } from "antd";
import { CSSTransition } from "react-transition-group";

import { reduxContext } from "@/store";

interface IProps {
  location: {
    search: string;
  };
}

function NoteTable(props: IProps): JSX.Element {
  const { noteList, dispatch } = React.useContext(reduxContext);
  const [show, setShow] = React.useState(false);
  const nowStore = props.location.search.slice(1).split("=")[1];
  React.useEffect(() => {
    setShow(true);
    return (): void => {
      setShow(false);
    };
  }, []);

  const iconStyle = {
    cursor: "pointer",
    fontSize: "24px",
    marginRight: "8px"
  };
  function play(from): void {
    (document.querySelector(`#audio_${from}`) as HTMLMediaElement).play();
  }
  function notFind(from): void {
    if (from === `loglevel:webpack-dev-server`) return; //dev
    (document.querySelector(`#audio_${from}`) as HTMLElement).style.visibility =
      "hidden";
  }
  function removeItem(index): void {
    const spliceItem = noteList[nowStore].splice(index, 1);
    dispatch({
      type: "UPDATE",
      key: "noteList",
      value: noteList,
      save: nowStore === "public" && "删除成功"
    });
    if (nowStore === "local") {
      localStorage.removeItem(spliceItem[0].from);
      message.info("删除成功");
    }
  }
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text, record, index): number => index + 1
    },
    {
      title: "From",
      dataIndex: "from"
    },
    {
      title: "To",
      dataIndex: "to"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index): JSX.Element => (
        <span>
          <audio
            src={`http://203.195.141.131:3100/static/media/${record.from}.mp3`}
            id={`audio_${record.from}`}
            onError={(): void => notFind(record.from)}></audio>
          <Icon
            type="play-circle"
            style={iconStyle}
            onClick={(): void => play(record.from)}
          />
          <Icon
            type="close-circle"
            style={iconStyle}
            onClick={(): void => removeItem(index)}
          />
          <Icon type="info-circle" style={iconStyle} />
        </span>
      )
    }
  ];

  return (
    <section>
      <CSSTransition in={show} classNames="fade" timeout={400} unMountOnExit>
        <Table
          dataSource={noteList[nowStore]}
          columns={columns}
          pagination={{ pageSize: 8 }}
        />
      </CSSTransition>
    </section>
  );
}

export default NoteTable;
