import styled from 'styled-components';

interface SideBar {
  content: string;
  src: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SideBarComponent = (sidebar: SideBar) => {
  return (
    <SideBarContainer>
      <SideBarImage as={sidebar.src} />
      <SideBarContent>{sidebar.content}</SideBarContent>
    </SideBarContainer>
  );
};

export default SideBarComponent;

const SideBarContainer = styled.div`
  width: 260px;
  height: 55px;
  display: flex;
  align-items: center;
  padding: 13px;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY1};
`;

const SideBarImage = styled.img`
  margin-right: 10px;
`;

const SideBarContent = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.BLACK};
`;
