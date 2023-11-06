import styled from 'styled-components';

interface SideBarProps {
  content: 'Dashboard' | 'Game' | 'Setting';
  src: string;
  state: boolean;
}

const SideBarComponent = (sidebar: SideBarProps) => {
  return (
    <SideBarContainer state={sidebar.state}>
      <SideBarImage src={sidebar.src} />
      <SideBarContent>{sidebar.content}</SideBarContent>
    </SideBarContainer>
  );
};

export default SideBarComponent;

const SideBarContainer = styled.div<{ state: boolean }>`
  width: 260px;
  height: 55px;
  display: flex;
  align-items: center;
  padding: 13px;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY1};
  filter: ${(props) => (props.state ? 'none' : 'invert(50%)')};
`;

const SideBarImage = styled.img`
  margin-right: 10px;
`;

const SideBarContent = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.BLACK};
`;
