import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as LayoutAntd } from "antd";
import CustomTable from "../Table";
import Draggable from "../Draggable";

const { Content, Sider } = LayoutAntd;

function LayoutMain() {
  const resizableRef = React.useRef(null)

  return (
    <LayoutAntd>
      <Content style={{ padding: "0px 40px", background: "LightSeaGreen" }}>
        <LayoutAntd
          className="site-layout-background"
          style={{ padding: "20px 0", background: "LightSeaGreen" }}
        >
          <Sider
            ref={resizableRef}
            id="Resizable"
            className="site-layout-background"
            width="40%"
            style={{background: "LightSeaGreen"}}
          >
            <CustomTable />
            <Draggable  resizableRef={resizableRef}/>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280, background: "LightSeaGreen" }}>
            <Outlet />
          </Content>
        </LayoutAntd>
      </Content>
    </LayoutAntd>
  );
}

export default LayoutMain;
