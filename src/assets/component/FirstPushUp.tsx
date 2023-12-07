import styled from 'styled-components';
import posePushUp from '../images/Pose-pushup.jpg';

const FirstPushUp = () => {
  return (
    <Container>
      <CameraGuide>
        <Pose src={posePushUp} alt="푸쉬업" />
      </CameraGuide>
      <Text>반드시 카메라가 측면을 바라보도록 해주세요.</Text>
    </Container>
  );
};

export default FirstPushUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CameraGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 350px;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 20px;
`;

const Pose = styled.img`
  width: 300px;
  height: 400px;
  margin-bottom: 20px;
`;
