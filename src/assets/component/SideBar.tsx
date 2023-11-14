import styled from 'styled-components';
import SideBarComponent from './SideBarComponent';
import { ReactComponent as SideBarLogo } from '../images/logo_orange.svg';
import DashBoard from '../images/dashboard.svg';
import Game from '../images/game.svg';
import Setting from '../images/setting.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SideBar {
  content: 'Dashboard' | 'Game' | 'Setting';
  src: string;
  state: SideBarState;
  path: string;
}
interface SideBarState {
  Dashboard: boolean;
  Game: boolean;
  Setting: boolean;
}

const SideBar = () => {
  const navigate = useNavigate();
  const [sideState, setSideState] = useState({
    Dashboard: true,
    Game: false,
    Setting: false,
  });

  const sideComponents: SideBar[] = [
    {
      content: 'Dashboard',
      path: '/dashboard',
      src: DashBoard,
      state: { Dashboard: true, Game: false, Setting: false },
    },
    {
      content: 'Game',
      path: '/game',
      src: Game,
      state: { Dashboard: false, Game: true, Setting: false },
    },
    {
      content: 'Setting',
      path: '/setting',
      src: Setting,
      state: { Dashboard: false, Game: false, Setting: true },
    },
  ];

  const handleClick = (item: SideBar) => {
    setSideState(item.state);
    navigate(item.path);
    console.log(sideState);
  };

  return (
    <>
      <SideBarContainer>
        <SideBarHeader>
          <SideBarLogo />
        </SideBarHeader>
        {sideComponents.map((item, index) => (
          <button key={index} onClick={() => handleClick(item)}>
            <SideBarComponent
              content={item.content}
              src={item.src}
              state={sideState[item.content]}
            />
          </button>
        ))}
      </SideBarContainer>
    </>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const SideBarHeader = styled.div`
  display: flex;
  justify-content: center;
`;
