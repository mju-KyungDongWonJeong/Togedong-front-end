import { useRef, useEffect } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PushUpGameGuide from '../../modal/PushUpGameGuide';
import GameResult from '../../modal/GameResult';
import exitImage from '../../images/logout.svg';
import axios from 'axios';
import getWebSocket from '../../../api/GetWebSocket';

await tf.ready();
let detector = await poseDetection.createDetector(
  poseDetection.SupportedModels.BlazePose,
  {
    runtime: 'tfjs',
    modelType: 'full',
  },
);
const ws = getWebSocket(process.env.REACT_APP_ML_BASE_URL + 'count_pushups');

const PushUpGameRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [gameStart, setGameStart] = useState(false); // 게임 시작 여부
  const [count, setCount] = useState(0); // 운동 개수
  const [gameTimer, setGameTimer] = useState(60); // 타이머
  const [gameResultVisible, setGameResultVisible] = useState(false); // 게임 결과

  const handleStartButtonClick = () => {
    setGameStart((prev) => !prev);
  };

  const handleExit = () => {
    ws.close();
    detector.dispose();
    detector = null;
    navigate('/gamelist');
  };

  const webcamRef = useRef(null);

  const runBlazePose = async () => {
    // blasepose모델 감지

    setInterval(() => {
      detect(detector);
    }, 500); // 0.5초
  };

  useEffect(() => {
    const initializeTensorflow = async () => {
      runBlazePose();
      await tf.ready();
    };

    initializeTensorflow();
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimatePoses(video); // 포즈 추출
      if (
        gameStart &&
        pose[0]?.keypoints3D.filter((item) => item.score < 0.27).length < 10
      ) {
        // 포즈가 있고, 측정 시작을 눌렀을 때 시작
        ws.send(JSON.stringify(pose[0].keypoints3D));
      }
    }

    ws.onmessage = function (event) {
      const paresdData = JSON.parse(event.data);
      // ml서버로부터 데이터 수신
      setCount(paresdData.count);
      const timeData = Math.round(paresdData.time);
      if (timeData > 60) {
        ws.close();
        setGameResultVisible(true);
        postRecord();
      } else {
        setGameTimer(60 - Math.round(paresdData.time));
      }
    };
  };

  window.requestAnimationFrame(runBlazePose);

  const record_data = {
    exerciseName: location.state.exerciseName,
    record: count,
  };

  const postRecord = async () => {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + '/api/record',
      record_data,
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
    <All>
      {gameResultVisible ? (
        <GameResult roomManager={location.state.roomManager} count={count} />
      ) : (
        <Container>
          <HeaderContainer>
            <HeaderTitle>{location.state.roomTitle}</HeaderTitle>
            <ExitRoom
              src={exitImage}
              alt="나가기 이미지"
              onClick={handleExit}
            />
          </HeaderContainer>
          <PushUpGameGuide />
          <TimerBox>{gameTimer}</TimerBox>
          <CountBox>{count}</CountBox>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{
              textAlign: 'center',
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '700px',
              height: '600px',
              top: 150,
              left: 0,
              right: 0,
              zIndex: -100,
              borderRadius: '10px',
              border: '3px solid wheat',
            }}
          />
          <StartButton onClick={handleStartButtonClick}>측정하기</StartButton>
        </Container>
      )}
    </All>
  );
};

export default PushUpGameRoom;

const All = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  position: sticky;
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BLACK};
  line-height: 60px;
  align-items: center;
  background-color: white;
`;

const HeaderTitle = styled.p`
  font-size: 40px;
  margin-left: auto;
`;

const ExitRoom = styled.img`
  margin-left: auto;
  padding-right: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const TimerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 30px;
  top: 80px;
  width: 200px;
  height: 200px;
  font-size: 100px;
  background-color: beige;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.WHITE};
`;

const StartButton = styled.button`
  position: absolute;
  top: 680px;
  right: 30px;
  width: 120px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
  color: white;
  font-size: 20px;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 30px;
  top: 80px;
  width: 200px;
  height: 200px;
  font-size: 100px;
  background-color: pink;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.WHITE};
`;
