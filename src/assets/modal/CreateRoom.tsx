import styled from 'styled-components';
import { ReactComponent as PushUp } from '../images/push-up.svg';
import { ReactComponent as Squat } from '../images/squat.svg';
import { ReactComponent as Cancle } from '../images/cancel.svg';
import ExerciseImg from '../component/ExerciseImg';
import SmallButton from '../component/SmallButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CreateRoom {
  onClick(): void;
}

interface CreateRoomProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoom = ({ setIsOpen }: CreateRoomProps) => {
  const [selectExercise, setSelectExercise] = useState<'PUSH_UP' | 'SQUAT'>(
    'PUSH_UP',
  );
  const [passwordBox, setPasswordBox] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [countPerson, setCountPerson] = useState<string>('1');
  const navigate = useNavigate();

  const handleCreate = async () => {
    const res = await createRoom();
    if (res.data.exerciseName == 'PUSH_UP') {
      navigate(`/pushupgameroom/${res.data.roomManager}`, { state: res.data });
    } else {
      navigate(`/squatgameroom/${res.data.roomManager}`, { state: res.data });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

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

  const room_data = {
    title: title, // 방제목
    memberLimit: Number(countPerson), // 사람 수
    exerciseName: selectExercise, // 운동 이름
    hasPassword: passwordBox, // 비밀번호 여부
    password: password, // 비밀번호
  };

  const createRoom = async () => {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + 'api/room',
      room_data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    return response.data;
  };

  return (
    <>
      <BackGround></BackGround>
      <CreateRoomContainer>
        <CreateRoomHeader>
          <button onClick={() => setSelectExercise('PUSH_UP')}>
            <ExerciseImg
              isModal={true}
              src={PushUp}
              title="푸쉬업"
              check={selectExercise === 'PUSH_UP'}
            />
          </button>
          <button onClick={() => setSelectExercise('SQUAT')}>
            <ExerciseImg
              isModal={true}
              src={Squat}
              title="스쿼트"
              check={selectExercise === 'SQUAT'}
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
              {/* <option key="2" value="2">
                2
              </option>
              <option key="3" value="3">
                3
              </option> */}
            </CountSelect>
          </CountContainer>
          <ButtonContainer>
            <button type="button" onClick={handleCreate}>
              <SmallButton text="만들기" />
            </button>
          </ButtonContainer>
        </ContentContainer>
        <CancleButton onClick={handleCancel}>
          <Cancle />
        </CancleButton>
      </CreateRoomContainer>
    </>
  );
};

export default CreateRoom;

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
`;

const CreateRoomContainer = styled.div`
  width: 600px;
  height: 500px;
  padding: 20px 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.WHITE};
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
