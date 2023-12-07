import styled from 'styled-components';
import poseSquat from '../images/Pose-squat.jpg';

const FirstSquat = () => {
  return (
    <Container>
      <CameraGuide>
        <Pose src={poseSquat} alt="스쿼트" />
      </CameraGuide>
      <Text>반드시 카메라가 정면을 바라보도록 해주세요.</Text>
    </Container>
  );
};

export default FirstSquat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CameraGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 20px;
`;

const Pose = styled.img`
  width: 300px;
  height: 400px;
`;
