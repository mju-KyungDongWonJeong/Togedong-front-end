import styled from 'styled-components';
import ExerciseImg from '../component/ExerciseImg';
import { ReactComponent as PushUp } from '../images/push-up.svg';
import { ReactComponent as Squat } from '../images/squat.svg';
import { useEffect, useState } from 'react';
import SmallButton from '../component/SmallButton';
import CreateRoom from '../modal/CreateRoom';
import SearchInput from '../component/SearchInput';
import List from '../component/GameRoomList';
import { GetRoomList } from '../../api/GetRoomList';
import {
  GameRoom,
  GetRoomListError,
  GetRoomListPayload,
} from '../type/GetRoomListPayload';

const GameList = () => {
  const [selectExercise, setSelectExercise] = useState<'PUSH_UP' | 'SQUAT'>(
    'PUSH_UP',
  );
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [roomList, setRoomList] = useState<GameRoom[]>([]);

  useEffect(() => {
    GetRoomList({ selectExercise, handleGameRoomList, handleError });
  }, [selectExercise]);

  const handleCreateRoom = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
    setSearch('');
  };

  const handleGameRoomList = (data: GetRoomListPayload) => {
    setRoomList(data.data.rooms);
  };

  const handleError = (error: GetRoomListError) => {
    alert(error.cause);
  };

  return (
    <>
      {isOpen && <CreateRoom setIsOpen={setIsOpen} />}
      <GameListContainer>
        <GameListHeader>
          <GameSelectContainer>
            <button onClick={() => setSelectExercise('PUSH_UP')}>
              <ExerciseImg
                isModal={false}
                src={PushUp}
                title="푸쉬업"
                check={selectExercise === 'PUSH_UP'}
              />
            </button>
            <button onClick={() => setSelectExercise('SQUAT')}>
              <ExerciseImg
                isModal={false}
                src={Squat}
                title="스쿼트"
                check={selectExercise === 'SQUAT'}
              />
            </button>
          </GameSelectContainer>
          <CreateRoomContainer>
            <SmallButton text="생성하기" onClick={handleCreateRoom} />
          </CreateRoomContainer>
        </GameListHeader>
        <GameListBackground>
          <ContentContainer>
            <InputContainer>
              <SearchInput
                onSubmit={handleSubmit}
                placeholder="방을 검색 하세요!"
                search={search}
                setSearch={setSearch}
              />
            </InputContainer>
            <List
              title="방 이름"
              roomMaker="생성자"
              count="참여인원"
              roomList={roomList}
              selectExercise={selectExercise}
            />
          </ContentContainer>
        </GameListBackground>
      </GameListContainer>
    </>
  );
};

export default GameList;

const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameListHeader = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const GameSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  gap: 200px;
`;

const CreateRoomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 20px 60px;
`;

const GameListBackground = styled.div`
  width: 100%;
  background-color: #f3f5f9;
  min-height: 500px;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 10px 60px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px 0;
`;
