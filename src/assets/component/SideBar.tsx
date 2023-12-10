import styled from 'styled-components';
import SideBarComponent from './SideBarComponent';
import { ReactComponent as SideBarLogo } from '../images/logo_orange.svg';
import DashBoard from '../images/dashboard.svg';
import Game from '../images/game.svg';
import Setting from '../images/setting.svg';
import { useLocation, useNavigate } from 'react-router-dom';

interface SideBar {
  content: 'Dashboard' | 'Game' | 'Setting';
  src: string;
  state: string;
  path: string;
}

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('userName');

  const sideComponents: SideBar[] = [
    {
      content: 'Dashboard',
      path: `/dashboard/${userName}`,
      src: DashBoard,
      state: '/dashboard',
    },
    {
      content: 'Game',
      path: '/gamelist',
      src: Game,
      state: '/gamelist',
    },
    {
      content: 'Setting',
      path: '/setting',
      src: Setting,
      state: '/setting',
    },
  ];

  return (
    <>
      <SideBarContainer>
        <SideBarHeader>
          <SideBarLogo />
        </SideBarHeader>
        {sideComponents.map((item, index) => (
          <button key={index} onClick={() => navigate(item.path)}>
            <SideBarComponent
              content={item.content}
              src={item.src}
              state={location.pathname.includes(item.state)}
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
