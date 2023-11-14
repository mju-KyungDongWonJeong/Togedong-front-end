import styled from 'styled-components';
import ExerciseImg from '../component/ExerciseImg';
import { ReactComponent as PushUp } from '../images/push-up.svg';
import { ReactComponent as Squat } from '../images/squat.svg';
import { useState } from 'react';

type ExerciseState = {
  PUSHUP: boolean;
  SQUAT: boolean;
};

const GameList = () => {
  const [selectExercise, setSelectExercise] = useState<ExerciseState>({
    PUSHUP: true,
    SQUAT: false,
  });
  return (
    <GameListContainer>
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
    </GameListContainer>
  );
};

export default GameList;

const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const GameSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  gap: 200px;
`;
