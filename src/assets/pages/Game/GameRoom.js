import { useRef, useEffect } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SquatGameGuide from '../../modal/SquatGameGuide';
import PushUpGameGuide from '../../modal/PushUpGameGuide';
import exitImage from '../../images/logout.svg';

const GameRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.pathname.includes('PUSH')
    ? 'count_pushups'
    : 'count_squat';

  const ws = new WebSocket(`ws://3.36.69.175:8000/${type}`);

  const [gameStart, setGameStart] = useState(false); // 게임 시작 여부
  const [count, setCount] = useState(0); // 운동 개수
  const [gameTimer, setGameTimer] = useState(60); // 타이머

  const handleStartButtonClick = () => {
    setGameStart((prev) => !prev);
  };

  const GameTimer = () => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setGameTimer((timer) => timer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }, [setGameTimer]);

    return <h1>{gameTimer}</h1>;
  };

  const handleExit = () => {
    ws.close();
    navigate('/gamelist');
  };

  const webcamRef = useRef(null);

  const runBlazePose = async () => {
    // blasepose모델 감지
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.BlazePose,
      {
        runtime: 'tfjs',
        modelType: 'full',
      },
    );

    setInterval(() => {
      detect(detector);
    }, 500);
  };

  useEffect(() => {
    const initializeTensorflow = async () => {
      await tf.ready();
      runBlazePose();
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

      if (pose[0] && gameStart) {
        // 포즈가 있고, 측정 시작을 눌렀을 때 시작
        setTimeout(() => ws.send(JSON.stringify(pose[0].keypoints3D)), 5000);
      }
    }

    // setInterval(() => setCount((prev) => prev + 1), 3000);
    ws.onmessage = function (event) {
      // ml서버로부터 데이터 수신
      console.log('count : ', event.data);
      setCount(event.data);
    };
  };

  window.requestAnimationFrame(runBlazePose);

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>{location.state.roomTitle}</HeaderTitle>
        <ExitRoom src={exitImage} alt="나가기 이미지" onClick={handleExit} />
      </HeaderContainer>
      {location.pathname.includes('PUSH') ? (
        <PushUpGameGuide />
      ) : (
        <SquatGameGuide />
      )}
      <TimerBox>{gameStart ? <GameTimer /> : gameTimer}</TimerBox>
      <CountBox>{count}</CountBox>
      <WebcamBox>
        <Webcam
          audio={false}
          ref={webcamRef}
          style={{
            textAlign: 'center',
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '600px',
            height: '500px',
            top: 150,
            left: 0,
            right: 0,
            zIndex: -100,
            borderRadius: '10px',
            border: '3px solid wheat',
          }}
        />
      </WebcamBox>
      <StartButton onClick={handleStartButtonClick}>측정하기</StartButton>
    </Container>
  );
};

export default GameRoom;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BLACK};
  line-height: 60px;
  justify-content: center;
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

const WebcamBox = styled.div``;
