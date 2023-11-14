import styled from 'styled-components';
import ExerciseImg from '../component/ExerciseImg';
import { ReactComponent as PushUp } from '../images/push-up.svg';
import { ReactComponent as Squat } from '../images/squat.svg';
import { useState } from 'react';
import SmallButton from '../component/SmallButton';
import CreateRoom from '../modal/CreateRoom';

type ExerciseState = {
  PUSHUP: boolean;
  SQUAT: boolean;
};

const GameList = () => {
  const [selectExercise, setSelectExercise] = useState<ExerciseState>({
    PUSHUP: true,
    SQUAT: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateRoom = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && <CreateRoom setIsOpen={setIsOpen} />}
      <GameListContainer>
        <GameListHeader>
          <GameSelectContainer>
            <button
              onClick={() => setSelectExercise({ PUSHUP: true, SQUAT: false })}
            >
              <ExerciseImg
                isModal={false}
                src={PushUp}
                title="푸쉬업"
                check={selectExercise.PUSHUP}
              />
            </button>
            <button
              onClick={() => setSelectExercise({ PUSHUP: false, SQUAT: true })}
            >
              <ExerciseImg
                isModal={false}
                src={Squat}
                title="스쿼트"
                check={selectExercise.SQUAT}
              />
            </button>
          </GameSelectContainer>
          <CreateRoomContainer>
            <SmallButton text="생성하기" onClick={handleCreateRoom} />
          </CreateRoomContainer>
        </GameListHeader>
        <GameListBackground></GameListBackground>
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
