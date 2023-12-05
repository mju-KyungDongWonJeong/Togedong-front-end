import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { sidebarState } from '../store/atoms/Sidebar/state';
import ListItem from './GameRoomListItem';
import { GameRoom } from '../type/GetRoomListPayload';

interface ListProps {
  title: string;
  roomMaker: string;
  count: string;
  roomList: GameRoom[];
  selectExercise?: string;
}

const List = ({
  title,
  roomMaker,
  count,
  roomList,
  selectExercise,
}: ListProps) => {
  const navbar = useRecoilValue(sidebarState);

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle navbar={navbar}>{title}</ListTitle>
        <ListroomMaker>{roomMaker}</ListroomMaker>
        <ListCount>{count}</ListCount>
      </ListHeader>
      {roomList &&
        roomList.map(
          (item) =>
            selectExercise === item.exerciseName && (
              <ListItem key={item.roomId} rowData={item} />
            ),
        )}
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 20px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY3};
  color: ${({ theme }) => theme.colors.GRAY3};
  font-size: 20px;
  font-weight: 500;
`;

const ListTitle = styled.div<{ navbar: boolean }>`
  width: ${(props) => (props.navbar ? '350px' : '500px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListroomMaker = styled.div`
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
