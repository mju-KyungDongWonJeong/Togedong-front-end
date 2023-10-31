import styled from 'styled-components';
import { ReactComponent as PushUp } from '../images/push-up.svg';
import { ReactComponent as Squat } from '../images/squat.svg';
import { ReactComponent as Cancle } from '../images/cancle.svg';
import ExerciseImg from '../component/ExerciseImg';
import SmallButton from '../component/SmallButton';
import { useState } from 'react';

type ExerciseState = {
  PUSHUP: boolean;
  SQUAT: boolean;
};

interface CreateRoom {
  onClick(): void;
}

const CreateRoom = () => {
  const [selectExercise, setSelectExercise] = useState<ExerciseState>({
    PUSHUP: true,
    SQUAT: false,
  });
  const [passwordBox, setPasswordBox] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [countPerson, setCountPerson] = useState<string>('1');
  const handleCreate = () => {};
  //   const handleCancle = () => onClick();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordBox = () => {
    setPasswordBox((prev) => !prev);
  };

  const selectPerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountPerson(e.target.value);
  };

  return (
    <CreateRoomContainer>
      <CreateRoomHeader>
        <button
          onClick={() => setSelectExercise({ PUSHUP: true, SQUAT: false })}
        >
          <ExerciseImg
            src={PushUp}
            title="푸쉬업"
            check={selectExercise.PUSHUP}
          />
        </button>
        <button
          onClick={() => setSelectExercise({ PUSHUP: false, SQUAT: true })}
        >
          <ExerciseImg
            src={Squat}
            title="스쿼트"
            check={selectExercise.SQUAT}
          />
        </button>
      </CreateRoomHeader>
      <ContentContainer>
        <RoomTitleBox>
          <RoomTitle>방 이름</RoomTitle>
          <TitleInput onChange={handleTitle} value={title} />
        </RoomTitleBox>
        <RoomPasswordBox>
          <PasswordNameBox>
            <PasswordName>비밀번호</PasswordName>
            <PasswordCheck type="checkbox" onClick={handlePasswordBox} />
          </PasswordNameBox>
          {passwordBox && (
            <PasswordInput
              type="password"
              onChange={handlePassword}
              value={password}
            />
          )}
        </RoomPasswordBox>
        <CountContainer>
          <CountTitle>인원수</CountTitle>
          <CountSelect onChange={selectPerson}>
            <option key="1" value="1">
              1
            </option>
            <option key="2" value="2">
              2
            </option>
            <option key="3" value="3">
              3
            </option>
          </CountSelect>
        </CountContainer>
        <ButtonContainer>
          <button onClick={handleCreate}>
            <SmallButton text="만들기" />
          </button>
        </ButtonContainer>
      </ContentContainer>
      <CancleButton>
        <Cancle />
      </CancleButton>
    </CreateRoomContainer>
  );
};

export default CreateRoom;

const CreateRoomContainer = styled.div`
  width: 600px;
  height: 500px;
  padding: 20px 100px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const CreateRoomHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;

const ContentContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.GRAY3};
  border-radius: 10px;
  padding: 30px 40px;
`;

const RoomTitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  margin-bottom: 10px;
`;

const RoomTitle = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY3};
  border-radius: 10px;
`;

const RoomPasswordBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  margin-bottom: 10px;
`;

const PasswordNameBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PasswordName = styled.div`
  font-size: 15px;
`;

const PasswordCheck = styled.input``;

const PasswordInput = styled.input`
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY3};
  border-radius: 10px;
`;

const CountContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CountTitle = styled.div`
  margin-right: 10px;
  font-size: 15px;
`;

const CountSelect = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const CancleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;
