import React from "react";
import styled from "styled-components";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const SidebarNav = styled.nav`
  // background: #15171c;
  //  background: #b11f1f;
  background: #d71921;
  width: 280px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0; 
  transition: 350ms;
  // z-index: 10;
  margin-top: 61px;
  border-radius: 0px 10px 0px 0px;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {

  return (
    <div>
      <IconContext.Provider value={{color: '#fff'}}>
        {/* <Nav>/
            <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
        </Nav> */}
        <SidebarNav >
            <SidebarWrap>
              {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
