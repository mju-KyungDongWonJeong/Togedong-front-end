import styled from 'styled-components';
import SearchInput from './SearchInput';
import logout from '../images/logout.svg';
import sidebar from '../images/sidebar.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { useRecoilState } from 'recoil';
import { sidebrState } from '../store/atoms/Sidebar/state';

const MainHeader = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useRecoilState(sidebrState);
  const handleLogout = () => {
    navigate('/login');
  };

  const handleSideBar = () => {
    setNavbar((props) => !props);
    console.log(navbar);
  };
  return (
    <>
      {navbar && <SideBar />}
      <OutletContiner>
        <Header>
          <LeftContainer>
            <button onClick={handleSideBar}>
              <SidebarImage src={sidebar} alt="사이드바 이미지" />
            </button>
            <SearchInput />
          </LeftContainer>
          <ExitImage
            src={logout}
            alt="로그아웃 이미지"
            onClick={handleLogout}
          />
        </Header>
        <Outlet />
      </OutletContiner>
    </>
  );
};

export default MainHeader;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 74px;
  padding: 0 28px;
`;

const LeftContainer = styled.div`
  width: 335px;
  display: flex;
  align-items: center;
`;

const ExitImage = styled.img`
  width: 30px;
  height: 34px;

  &:hover {
    cursor: pointer;
  }
`;

const SidebarImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const OutletContiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
