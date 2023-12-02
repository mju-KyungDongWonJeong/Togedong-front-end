import styled from 'styled-components';
import SmallButton from './SmallButton';
import { useRecoilValue } from 'recoil';
import { sidebarState } from '../store/atoms/Sidebar/state';
import { useNavigate } from 'react-router-dom';
import { GameRoom } from '../type/GetRoomListPayload';

interface ListItemProps {
  rowData: GameRoom;
}

const ListItem = ({ rowData }: ListItemProps) => {
  const navbar = useRecoilValue(sidebarState);
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/game');

  return (
    <ListBox>
      <ListTitle navbar={navbar}>{rowData.title}</ListTitle>
      <ListRoomMaker>{rowData.managerName}</ListRoomMaker>
      <ListCount>{rowData.memberLimit}</ListCount>
      <SmallButton text="참가하기" onClick={handleNavigate} />
    </ListBox>
  );
};

export default ListItem;

const ListTitle = styled.div<{ navbar: boolean }>`
  width: ${(props) => (props.navbar ? '350px' : '500px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListRoomMaker = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListCount = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
`;

const ListBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 15px;
`;

const ParticipateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 94px;
`;
