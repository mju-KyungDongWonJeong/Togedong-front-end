import styled from 'styled-components';
import ExerciseImg from '../component/ExerciseImg';
import { ReactComponent as PushUp } from '../images/push-up.svg';
import { ReactComponent as Squat } from '../images/squat.svg';
import { useState } from 'react';
import SmallButton from '../component/SmallButton';
import CreateRoom from '../modal/CreateRoom';
import SearchInput from '../component/SearchInput';
import List from '../component/List';

const GameList = () => {
  const [selectExercise, setSelectExercise] = useState('pushup');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>('');

  const handleCreateRoom = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
    setSearch('');
  };

  const roomData = [
    {
      id: 0,
      firstContent: '나랑 1대1 뜨실분 ',
      secondContent: '김정호',
      thirdContent: '1/2',
      exercise: 'pushup',
    },
    {
      id: 1,
      firstContent: '너뭔데 ㅋㅋ',
      secondContent: '경규혁',
      thirdContent: '1/3',
      exercise: 'squat',
    },
  ];

  return (
    <>
      {isOpen && <CreateRoom setIsOpen={setIsOpen} />}
      <GameListContainer>
        <GameListHeader>
          <GameSelectContainer>
            <button onClick={() => setSelectExercise('pushup')}>
              <ExerciseImg
                isModal={false}
                src={PushUp}
                title="푸쉬업"
                check={selectExercise === 'pushup'}
              />
            </button>
            <button onClick={() => setSelectExercise('squat')}>
              <ExerciseImg
                isModal={false}
                src={Squat}
                title="스쿼트"
                check={selectExercise === 'squat'}
              />
            </button>
          </GameSelectContainer>
          <CreateRoomContainer>
            <SmallButton text="생성하기" onClick={handleCreateRoom} />
          </CreateRoomContainer>
        </GameListHeader>
        <GameListBackground>
          <InputContainer>
            <SearchInput
              onSubmit={handleSubmit}
              placeholder="방을 검색 하세요!"
              search={search}
              setSearch={setSearch}
            />
          </InputContainer>
          <List
            title="첼린지"
            secondTitle="참여자 수"
            thridTitle="달성현황"
            listData={roomData}
            buttonType="navigate"
            selectExercise={selectExercise}
          />
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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 10px 60px;
`;
